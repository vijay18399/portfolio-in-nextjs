import Image from "next/image";
import SectionControls from '@/components/editor/main/SectionControls';

export default function Experience({ data }) {
  return  (
    <section id={data.id} className="section" style={data?.data?.styles}>
      <SectionControls data={data} />
      <div className="section-column">
        <h2 className="title" dangerouslySetInnerHTML={{ __html: data.data?.title }} />
        <p className="description" dangerouslySetInnerHTML={{ __html: data.data?.description }} />
        <div className="child-container">
          {data.data.items.map((item, index) => (
            <div className="section-card" key={index}>
              {item.logo && (
                <div className="icon-wrapper">
                  <Image
                    width="50"
                    height="50"
                    src={item.logo}
                    alt={item.name}
                    className="experience-logo"
                  />
                </div>
              )}
              <div className="info-wrapper">
                <div className="info-wrapper2">
                  <div className="left-side">
                    <h3 className="company-name">{item.title}</h3>
                    <h4 className="role">{item.role}</h4>
                  </div>
                  <div className="right-side">
                    <p className="location">{item.location}</p>
                    <p className="duration">{item.duration}</p>
                  </div>
                </div>
                {item.responsibilities && (
                  <div className="responsibilities" dangerouslySetInnerHTML={{ __html: item.responsibilities }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
