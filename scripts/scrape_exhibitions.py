import urllib.request
from bs4 import BeautifulSoup
import json
import re
import xml.etree.ElementTree as ET

def clean_text(text):
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()

def scrape_exhibitions():
    url = "https://bardionson.com/exhibitions/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    print(f"Fetching {url}...")
    
    try:
        html = urllib.request.urlopen(req).read()
    except Exception as e:
        print(f"Error fetching page: {e}")
        return

    soup = BeautifulSoup(html, 'html.parser')
    
    exhibitions = []
    
    # The main content is inside div with class "entry-content"
    content_area = soup.find('div', class_='entry-content')
    
    if not content_area:
        print("Could not find the entry-content div container")
        return
        
    current_year = "Unknown"
    
    # Iterate through paragraphs and headings
    for element in content_area.find_all(['p', 'h2', 'h3', 'h4', 'div']):
        text = clean_text(element.get_text())
        
        if not text:
            continue
            
        # Check if this element looks like a year heading
        if element.name in ['h2', 'h3', 'h4'] and re.search(r'(20\d{2})', text):
            # Extract just the year part
            match = re.search(r'(20\d{2})', text)
            if match:
                current_year = match.group(1)
            continue
            
        # Check if it looks like an exhibition entry
        # Typical format: Title - Event/Gallery - Location - Date/Month
        
        # Skip generic text paragraphs
        lower_text = text.lower()
        if "exhibition" in lower_text or "art fair" in lower_text or "gallery" in lower_text or "solo show" in lower_text or "art enables" in lower_text:
            
            # Simple heuristic: if it has lines or a structure that looks like an entry
            if len(text) > 10 and len(text) < 500: # Reasonable length for an entry
                
                # Check for duplicates based on raw_text
                is_dup = False
                for ex in exhibitions:
                    if text in ex['raw_text'] or ex['raw_text'] in text:
                        is_dup = True
                        break
                        
                if is_dup:
                    continue
                    
                entry = {
                    "year": current_year,
                    "raw_text": text
                }
                
                # Try to extract a link if there is one
                link = element.find('a')
                if link and link.get('href'):
                    entry["link"] = link.get('href')
                    
                exhibitions.append(entry)

    print(f"Found {len(exhibitions)} potential exhibition entries.")
    
    # Save to JSON
    output_path = "src/data/historic-exhibitions.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(exhibitions, f, indent=2, ensure_ascii=False)
        
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    scrape_exhibitions()
