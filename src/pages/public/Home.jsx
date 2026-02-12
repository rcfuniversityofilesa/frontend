import React from 'react'
import styles from '../../styles/pages/public/Home.module.css'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

import img1 from '../../assets/gallary1_14.jpg'
import img2 from '../../assets/gallary1_15.jpg'
import img3 from '../../assets/gallary1_16.jpg'
import img4 from '../../assets/gallary1_17.jpg'
import img5 from '../../assets/gallary1_21.jpg'
import img6 from '../../assets/gallary1_22.jpg'
import img7 from '../../assets/gallary1_26.jpg'
import img8 from '../../assets/gallary1_4.jpg'
import Button from '../../components/common/Button'
import ContactCard from '../../components/common/ContactCard'

export default function Home() {

  const slides = [img1, img2, img3, img4, img5, img6, img7, img8]

  return (
    <>
      <div className={styles.carouselWrap}>
        <Carousel controls={false} indicators={false} interval={2500}>
          {slides.map((src, index) => (
            <Carousel.Item key={index} className={styles.carouselItem}>
              <div className={styles.carouselOverlay}></div>
              <img src={src} />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className={styles.carouselCaption}>
          <h5>THE REDEEMED CHRISTAIN FELLOWSHIP</h5>
          <p>University of Ilesa Chapter</p>
          <h3>TRANSFORMATION CHAPEL</h3>
        </div>
      </div>

      <div className={styles.section}>
        <div className="container">
          <div className={styles.textBlock}>
            <h4>ABOUT US</h4>
            <p>Our fellowship, The Redeemed Christian Fellowship University of Ilesa, Transformation Chapel, stands as the happiest family on campus. We help students understand the reality of Christ. We teach truth with clarity. We create an environment where every student grows. We build a culture that honors God. We keep our focus on spiritual growth and unity. <br /> <br />

            Our Bible Study tagged Digging Deep gives students a better understanding of God’s word. We explain scripture with clarity. We answer questions that shape spiritual maturity. We help students apply the word in daily life. Our prayer meeting helps us seek the face of the Father. We grow stronger as we pray together. <br /> <br />

            Our mission of Aggressive Evangelism drives us beyond the campus. We reach people who need salvation. We speak to students, workers, traders, old people, and young people. We teach the message of Christ with clarity. We share testimony that leads hearts to truth. We trust God to touch lives through every outreach. <br /> <br />

            Our workforce stands united. Every department serves with purpose. Every worker supports the mission and vision of the fellowship. New students will feel God’s presence in a new dimension. They will find growth and direction. They will join a family that welcomes them with love. <Link to={'/aboutus'} >Read More</Link> </p>
          </div>

          <div className={styles.textBlock}>
            <h4>OUR MISSION</h4>
            <p>Our mission as RCF University of Ilesa chapter, Transformation Chapel centers on holy living, bold outreach, and aggressive evangelism. We choose a lifestyle that honors God in our thoughts and actions. We build strength through prayer and the Word. We reach unbelievers with clear teaching on salvation. We speak the gospel with confidence in every place God opens. <br /><br /> We form connections that point people to Christ. We stay active on campus through steady outreach. We place teams in hostels and lecture halls to reach students. We welcome newcomers into a fellowship where they grow in truth. We strengthen our unity as we work together. We hold to scriptures like 1 Peter 1:16, Mark 16:15, and Matthew 28:19.               <Link to={'/aboutus'} >Read More</Link> </p>
          </div>
        </div>
      </div>

      <div className={styles.workforce}>
        <div className="container">
          <h4>Work Force</h4>
          <h6>
            RCF University of Ilesa chapter, Transformation Chapel grows through an active workforce that serves with purpose. You see students leading prayer, worship, outreach, and follow up. You see teams handling media, teaching, drama, welfare, ushering, and sanitation. You see commitment that builds a strong fellowship. You see unity that strengthens every program. You see leaders who guide members with clear direction. You see workers who support newcomers with patience and care. You see a structure that helps you grow in faith and service. You see opportunities to use your gifts. You see a place where your walk with Christ becomes stronger. You see a family waiting for you to join and serve.
          </h6>

          <div className={styles.unitGrid}>
            {[
              "Media Unit", "Decoration Unit", "Choir Unit (Voice Of Redemption)", "Bible Study Unit", "Welfare Unit",
              "Protocol Unit", "Editorial Unit", "Follow-Up Unit", "Prayer Unit", "Evangelism Unit", "Academic Unit",
              "Technical Unit", "Sanitation Unit", "Ushering Unit"
            ].map((unit, index) => (
              <h5 key={index}>{unit}</h5>
            ))}

          </div>
          <div className={styles.applyBtn}>
            <Link to={'/apply-as-worker'} className='link'><Button text='Apply'/></Link>
          </div>
        </div>
      </div>

      <div className={styles.acceptChrist}>
        <div className="container">
          <div className={styles.acceptHeader}>
            <h2>Do You Want To Give Your Life To Christ?</h2>
            <h4>Please Follow The Steps Below.</h4>
          </div>

          <div className="accordion" id="salvationGuide">
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" style={{background: '#4338ca', color: '#fff', fontWeight: '600'}} data-bs-toggle="collapse" data-bs-target="#step1">
                  Acknowledge your sins. Acts 2:36 to 38
                </button>
              </h2>
              <div id="step1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <p>Therefore let all the house of Israel know assuredly, that God hath made the same Jesus, whom ye have crucified, both Lord and Christ. 37 Now when they heard this, they were pricked in their heart, and said unto Peter and to the rest of the apostles, Men and brethren, what shall we do? 38 Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.</p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{background: '#4338ca', color: '#fff', fontWeight: '600'}} data-bs-toggle="collapse" data-bs-target="#step2">
                  Confess your sins. Galatians 5:19 to 21
                </button>
              </h2>
              <div id="step2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <p>Now the works of the flesh are manifest, which are these; Adultery, fornication, uncleanness, lasciviousness, 20 Idolatry, witchcraft, hatred, variance, emulations, wrath, strife, seditions, heresies, 21 Envyings, murders, drunkenness, revellings, and such like: of the which I tell you before, as I have also told you in time past, that they which do such things shall not inherit the kingdom of God.</p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{background: '#4338ca', color: '#fff', fontWeight: '600'}} data-bs-toggle="collapse" data-bs-target="#step3">
                  Ask for forgiveness. 1 John 1:9
                </button>
              </h2>
              <div id="step3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <p>If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.</p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{background: '#4338ca', color: '#fff', fontWeight: '600'}} data-bs-toggle="collapse" data-bs-target="#step4">
                  Repent of your sins. Acts 3:19
                </button>
              </h2>
              <div id="step4" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <p>Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord.</p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{background: '#4338ca', color: '#fff', fontWeight: '600'}} data-bs-toggle="collapse" data-bs-target="#step5">
                  Forsake sinful habits. Luke 14:33
                </button>
              </h2>
              <div id="step5" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <p>So likewise, whosoever he be of you that forsaketh not all that he hath, he cannot be my disciple.</p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" style={{background: '#4338ca', color: '#fff', fontWeight: '600'}} data-bs-toggle="collapse" data-bs-target="#step6">
                  Join a Bible believing church. Hebrews 10:25
                </button>
              </h2>
              <div id="step6" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <p>Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> 

      <ContactCard />
    </>
  )
}
