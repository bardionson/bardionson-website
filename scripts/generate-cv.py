"""Regenerate the downloadable CV from the website CV entries.

Requires ReportLab: python3 -m pip install reportlab
Run from the repository root: python3 scripts/generate-cv.py
"""
from pathlib import Path
import argparse
import re
from shutil import copyfile
from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer,
)

ROOT = Path(__file__).resolve().parents[1]

def generate(root: Path, output: Path) -> None:
    source = (root / 'src/app/cv/page.tsx').read_text()
    # Each array uses one double-quoted object per entry in the CV component.
    def array(name):
        block = re.search(rf'const {name} = \[(.*?)\n    \];', source, re.S)
        if not block:
            raise ValueError(f'Missing CV section: {name}')
        rows = [dict(re.findall(r'(\w+): "([^"]*)"', line))
                for line in block[1].splitlines() if re.search(r'\{ (?:year|title):', line)]
        if not rows:
            raise ValueError(f'Empty CV section: {name}')
        return rows

    # Arial is available on macOS; DejaVu Sans is the portable alternative.
    font_options = [
        Path('/System/Library/Fonts/Supplemental'),
        Path('/usr/share/fonts/truetype/dejavu'),
    ]
    font_files = [
        ('Arial.ttf', 'Arial Bold.ttf', 'Arial Italic.ttf'),
        ('DejaVuSans.ttf', 'DejaVuSans-Bold.ttf', 'DejaVuSans-Oblique.ttf'),
    ]
    for directory, filenames in zip(font_options, font_files):
        if all((directory / name).exists() for name in filenames):
            for style, name in zip(('CV', 'CV-Bold', 'CV-Italic'), filenames):
                pdfmetrics.registerFont(TTFont(style, str(directory / name)))
            pdfmetrics.registerFontFamily('CV', normal='CV', bold='CV-Bold', italic='CV-Italic', boldItalic='CV-Bold')
            break
    else:
        raise RuntimeError('Install Arial or DejaVu Sans to generate the CV.')

    biography_match = re.search(r'const biography = "([^"]+)";', source)
    if not biography_match:
        raise ValueError('Missing current CV biography')

    def clean(text):
        return text.replace('\u2011', '-').replace('\u2013', '-').replace('\u2014', '-')
    def text(value):
        return escape(clean(value))

    body = ParagraphStyle('CVBody', fontName='CV', fontSize=10.5, leading=13.2,
                          textColor=colors.HexColor('#1e293b'), spaceAfter=5)
    title = ParagraphStyle('CVTitle', parent=body, fontName='CV-Bold', fontSize=26,
                           leading=31, alignment=TA_CENTER, spaceAfter=7)
    subtitle = ParagraphStyle('CVSubtitle', parent=body, fontSize=10, leading=14,
                              alignment=TA_CENTER, textColor=colors.HexColor('#475569'), spaceAfter=5)
    heading = ParagraphStyle('CVHeading', parent=body, fontName='CV-Bold', fontSize=14,
                             leading=18, spaceBefore=14, spaceAfter=7, keepWithNext=True)
    yearstyle = ParagraphStyle('CVYear', parent=body, fontName='CV-Bold', fontSize=10.5,
                               leading=14, spaceBefore=6, spaceAfter=3, keepWithNext=True)
    entry = ParagraphStyle('CVEntry', parent=body, leftIndent=15, spaceAfter=2.5)
    class CVDocument(SimpleDocTemplate):
        current_section = ''
        current_year = ''

        def afterFlowable(self, flowable):
            if hasattr(flowable, 'cv_section'):
                self.current_section = flowable.cv_section
                self.current_year = ''
            if hasattr(flowable, 'cv_year'):
                self.current_year = flowable.cv_year

    story = [Paragraph('Bård Ionson', title),
             Paragraph('Spiritual - Physical - Digital | GAN AI Art, CryptoArt, Digital &amp; Installation Art', subtitle),
             Paragraph('<link href="https://bardionson.com">BardIonson.com</link> | <link href="mailto:Bard@bardIonson.com">Bard@bardIonson.com</link>', subtitle),
             Spacer(1, 12),
             Paragraph('Bård Ionson’s work is held in the permanent collections of the <b>Bodleian Libraries at the University of Oxford</b> (<i>Battledore</i>) and the <b>Francisco Carolinum Museum</b> in Linz, Austria (<i>Alternate Fires</i>, from <i>Painting with Fire</i>).', body),
             Paragraph(text(biography_match[1]), body)]

    collections = re.search(r'\{/\* Permanent Collections \*/\}(.*?)\{/\* Solo Exhibitions \*/\}', source, re.S)
    if not collections:
        raise ValueError('Missing permanent collections')
    items = re.findall(r'<li>(.*?)</li>', collections[1], re.S)
    if len(items) < 2:
        raise ValueError('Both museum collection credits must be present')
    story.append(Paragraph('Permanent Collections', heading))
    for item in items:
        item = item.replace('<strong>', '<b>').replace('</strong>', '</b>').replace('<em>', '<i>').replace('</em>', '</i>')
        story.append(Paragraph(clean(item), entry))

    for name, label in [('soloExhibitions', 'Solo Exhibitions'), ('selectedExhibitions', 'Selected Exhibitions'), ('publications', 'Selected Publications, Articles, Interviews')]:
        section_heading = Paragraph(label, heading)
        section_heading.cv_section = label
        story.append(section_heading)
        previous_year = None
        for row in array(name):
            if row['year'] != previous_year:
                year_heading = Paragraph(text(row['year']), yearstyle)
                year_heading.cv_year = row['year']
                story.append(year_heading)
                previous_year = row['year']
            if name == 'publications':
                line = text(row['text'])
            else:
                line = f'<i>{text(row["title"])}</i>, {text(row["venue"])}'
            story.append(Paragraph(line, entry))

    practice_heading = Paragraph('Technical Research &amp; Professional Practice', heading)
    practice_heading.cv_section = 'Technical Research & Professional Practice'
    story.append(practice_heading)
    for practice in array('professionalPractice'):
        story.append(Paragraph(text(practice['title']), yearstyle))
        story.append(Paragraph(text(practice['text']), body))

    def footer(canvas, doc):
        canvas.saveState()
        if doc.page > 1:
            canvas.setFont('CV', 8)
            canvas.setFillColor(colors.HexColor('#64748b'))
            canvas.drawString(42, 769, 'Bård Ionson | Curriculum Vitae (continued)')
        canvas.setStrokeColor(colors.HexColor('#cbd5e1'))
        canvas.setLineWidth(0.5)
        canvas.line(42, 35, 570, 35)
        canvas.setFillColor(colors.HexColor('#64748b'))
        canvas.setFont('CV', 8)
        canvas.drawString(42, 23, 'Bård Ionson | Curriculum Vitae | Updated November 2026')
        canvas.drawRightString(570, 23, str(doc.page))
        canvas.restoreState()

    output.parent.mkdir(parents=True, exist_ok=True)
    doc = CVDocument(str(output), pagesize=(612,792), leftMargin=42, rightMargin=42,
                            topMargin=38, bottomMargin=48, title='Bård Ionson - Curriculum Vitae',
                            author='Bård Ionson', subject='Museum collections, exhibitions, and publications')
    doc.build(story, onFirstPage=footer, onLaterPages=footer)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    output = args.output or args.root / 'public/Bard_Ionson_CV_2026.pdf'
    generate(args.root, output)
    if args.output is None:
        # Keep existing download links serving the same current CV.
        copyfile(output, args.root / 'public/Bard_Ionson_CV_2025.pdf')
