export default function SkyBonesPage() {
    return (
        <div className="w-full h-[calc(100vh-4rem-1px)] relative bg-black">
            {/* 
        This page disables standard layout padding to allow the 
        iframe to consume the entire viewport beneath the header.
      */}
            <iframe
                src="https://sky-bones.bardionson.com/"
                className="w-full h-full border-0 absolute inset-0"
                title="Bones In The Sky Immersive Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
