import Image from "next/image";
import Link from "next/link";
import SectionControls from '@/components/editor/main/SectionControls';

export default function Portfolio({ data }) {
  return (
    <section id={data.id} className="section" style={data?.data?.styles}>
      <SectionControls data={data} />
      <div className="section-column">
        <h2 className="title" dangerouslySetInnerHTML={{ __html: data.data?.title }} />
        <p className="description" dangerouslySetInnerHTML={{ __html: data.data?.description }} />
        <div className="child-container">
          {data.data.links.map((link, index) => (
            <Link key={index} href={link.href || ""} className="portfolio-card">
              {link.isImage && link.imageUrl && (
                <div className="image-wrapper">
                  <Image
                    src={link.imageUrl}
                    alt={link.title}
                    width={220}
                    height={120}
                    className="rounded-image"
                  />
                </div>
              )}
              {!link.isImage && link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
