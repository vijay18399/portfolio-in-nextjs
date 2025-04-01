import SectionControls from '@/components/editor/main/SectionControls';
import Link from "next/link";

export default function SimpleBanner({ data }) {
  return (
    <section id={data.id} className="section">
      <SectionControls data={data} />
      <div className="simple-banner-container">
        <h5
          className="simple-banner-text"
          dangerouslySetInnerHTML={{ __html: data.data?.description }}
        />
        {data.data?.links?.map((link, index) => (
          <Link key={index} href={link.href} className="simple-banner-link">
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
