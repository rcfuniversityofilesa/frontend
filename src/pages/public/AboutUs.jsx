import React, { useEffect } from 'react'
import styles from '../../styles/pages/public/AboutUs.module.css'
import AOS from 'aos'
import 'aos/dist/aos.css';

import HeroImg from '../../assets/logo.png'
import bibleStudy from '../../assets/exco2.jpg'
import prayerCod from '../../assets/prayerCord.jpg'
import chefEd from '../../assets/chef.jpg'
import follow2 from '../../assets/Followupsecretary2.jpg'
import finSec from '../../assets/Financia secretary.jpg'
import PRO from '../../assets/EDITORINCHEIF.jpg'
import Drama from '../../assets/Dramacoordinator.jpg'
import AGS from '../../assets/AGS.jpg'
import Academic from '../../assets/Academic.jpg'
import Protocol from '../../assets/Protocolcoordinator.jpg'
import sport from '../../assets/sport.png'
import AMD from '../../assets/DSC_0033.jpg'
import media from '../../assets/media.jpg'
import MD from '../../assets/MusicDirector.jpg'
import Deco from '../../assets/Decoration.jpg'
import sani from '../../assets/asDSC_0026 (17).jpg'
import TC from '../../assets/TC.jpg'
import USH from '../../assets/ushahe.jpg' 
import brotherCord from '../../assets/asDSC_0026 (21)-2.jpg'
import sisterCord from '../../assets/sisss.jpg'
import omotola from '../../assets/praaaa.jpg'
import inioluwa from '../../assets/Choir MInistation (16).jpg'
import newAca from '../../assets/Academic.jpg'
import workerIn1 from '../../assets/DSC_0008.jpg'
import assBro from '../../assets/hyhyu (11).jpg'
import amd2 from '../../assets/new.jpg'
import assPro from '../../assets/nnn (1).jpg'
import werf from '../../assets/nnn (2).jpg'
import broSeg from '../../assets/DSC_0008-2.jpg'
import joan from '../../assets/joan.jpg'
import tran from '../../assets/offering (22).jpg'
import heyjay from '../../assets/heyjay2.jpeg'
import esther from '../../assets/Worship (19).jpg'
import sport2 from '../../assets/sport2.jpg'
import dml from '../../assets/dml.jpg'
import apray from '../../assets/apray.jpg'
import kosolu from '../../assets/kosolu2.jpeg'
import awerf from '../../assets/awerf.jpg'
import ife from '../../assets/ife2.jpeg'
import asssanitation from '../../assets/asssanitation.jpeg'
import sanitation from '../../assets/sanitation.jpeg'

export default function Aboutus() {
    useEffect(() => {
    AOS.init({
      duration: 1000,
      mirror: true
    });
  }, []);

  const excoData = [
    {
      id: 1,
      img: media,
      name: 'Fadare Testimony',
      post: 'President',  
      postTwo: '',  
      subPost: 'CEC Chairman'
    },
    {
      id: 2,
      img: media,
      name: 'OJO OLUWTOSIN',
      post: 'Vice president',  
      postTwo: `Worker's In Training Coordinator`,  
      subPost: 'CEC member'
    },
    {
      id: 3,
      img: media,
      name: 'ABIOYE MOSES',
      post: 'General Secretary',  
      postTwo: 'Alumni Relation Officer',  
      subPost: 'CEC member'
    },
    {
      id: 4,
      img: brotherCord,
      name: 'FOLAMAKINDE SAMUEL',
      post: `Brother's Coordinator`,  
      postTwo: '',  
      subPost: 'CEC member'
    },
    {
      id: 5,
      img: sisterCord,
      name: 'OLAROTIMI PRECIOUS',
      post: `Sister's Coordinator`,  
      postTwo: '',  
      subPost: 'CEC member'
    },
    {
      id: 6,
      img: omotola,
      name: 'ADEKUNLE OMOTOLA',
      post: `Prayer Cordinator`,  
      postTwo: '',  
      subPost: 'CEC member'
    },
    {
      id: 7,
      img: finSec,
      name: 'IDIEBARA GRACE',
      post: `Financial Secretary`,  
      postTwo: '',  
      subPost: 'CEC member'
    },
    {
      id: 8,
      img: PRO,
      name: 'OLUSOGO OKIKIJESU AYOMIDE',
      post: `Tresurer`,  
      postTwo: '',  
      subPost: 'CEC member'
    },
    {
      id: 9,
      img: prayerCod,
      name: 'ALAWODE PEACE',
      post: `Evangelism Coordinator`,  
      postTwo: '',  
      subPost: 'CEC member'
    },
    {
      id: 10,
      img: bibleStudy,
      name: 'Olugbodi Grace Adufe',
      post: `Bible Sturdy Cordinator`,  
      postTwo: 'Assitant Evangelism Cordinator',  
      subPost: ''
    },
    {
      id: 11,
      img: werf,
      name: 'ALBERT SIMILOLUWA',
      post: `Welfare and Health Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 12,
      img: AMD,
      name: 'TAIWO TOLUWANI',
      post: `Music Director`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 13,
      img: MD,
      name: 'AJAYI ELISHA',
      post: `Media Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 14,
      img: TC,
      name: 'Yusuf Ayomide Modecai',
      post: `Technical Cordinator`,
      postTwo: '',  
      subPost: ''
    },
    {
      id: 15,
      img: newAca,
      name: 'ADEMOKUNWA OLUWAFEMIFOLA',
      post: `Academic Cordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 16,
      img: chefEd,
      name: 'FOLAMAKINDE FAVOUR',
      post: `Chief-Editor`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 17,
      img: USH,
      name: 'OJO DEBORAH CHUKUNONSO',
      post: `Ushering Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 18,
      img: Deco,
      name: 'OVIGUERIEN FAITH',
      post: `Decorating Cordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 19,
      img: Protocol,
      name: 'OGUNJOBI DAMILOLA',
      post: `Protocol Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 20,
      img: inioluwa,
      name: 'ODELAANU INIOLUWA',
      post: `Follow-up Secretary 1`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 21,
      img: follow2,
      name: 'OJO SAMSON',
      post: `Drama Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 45,
      img: sanitation,
      name: 'ADEKOYA ENIOLA',
      post: `Sanitation Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 22,
      img: sport,
      name: 'OLAHANMI WEALTH',
      post: `Sport Director`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 22,
      img: tran,
      name: 'BABATUNDE OLAOLUWA',
      post: `Transportation Secretary`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 24,
      img: AGS,
      name: 'FAGBOLA OYINLOLA',
      post: `Assistant General Secretary`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 25,
      img: assBro,
      name: 'OLADOSU SAMUEL',
      post: `Assistant Brother's Coordinator`, 
      postTwo: '',  
      subPost: ''
    },
    {
      id: 26,
      img: follow2,
      name: 'ADEBAYO FAVOUR',
      post: `Assistant Sister's Coordinator`,  
      postTwo: '', 
      subPost: ''
    },
    {
      id: 27,
      img: broSeg,
      name: 'ONI OLUWASEGUN',
      post: `Assistant Bible Coordinator - 1`,   
      postTwo: '',  
      subPost: ''
    },
    {
      id: 28,
      img: esther,
      name: 'KOLAWOLE ESTHER',
      post: `Assistant Bible Coordinator - 2`, 
      subPost: ''
    },
    {
      id: 29,
      img: awerf,
      name: 'FARAMADE MOSUNMOlA',
      post: `Assistant Welfare Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 30,
      img: AMD,
      name: 'OMOLEBI TENIOLA',
      post: `Assistant Music Director - 1`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 31,
      img: amd2,
      name: 'OLATUNDE PRECIOUS',
      post: `Assistant Music DIrector - 2`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 32,
      img: kosolu,
      name: 'KOSOLU BLESSING',
      post: `Assistant Media Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 33,
      img: workerIn1,
      name: 'ONIFADE SAMUEL',
      post: `Assistant Worker's In Training - 1`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 34,
      img: joan,
      name: 'ADESINA JOAN',
      post: `Assistant Worker's In Training - 2`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 35,
      img: heyjay,
      name: 'ADEBOWALE ANJOLAOLUWA',
      post: `Assistant Academic Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 36,
      img: sport,
      name: 'FAFIOLA FISAYO',
      post: `Assistant Decorating Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 37,
      img: Drama,
      name: 'ADEOSUN PRAISE',
      post: `Assistant Drama Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 38,
      img: apray,
      name: 'OGHENEORO GOODNESS',
      post: `Assistant Prayer Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 39,
      img: ife,
      name: 'ADELOLA IFEOLUWA',
      post: `Assistant Ushering Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 40,
      img: Academic,
      name: 'ISHOLA SIMILOLUWA',
      post: `Assistant Technical Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 41,
      img: dml,
      name: 'AYOOLA VICTOR',
      post: `Assistant Follow-up Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 42,
      img: sport2,
      name: 'OLABOYE DANEL',
      post: `Assistant Sport Director`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 43,
      img: sport,
      name: 'ADEITAN KEHINDE',
      post: `Assistant Chief-Editor`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 44,
      img: asssanitation,
      name: 'OLADUNJOYE OLUWANIFEMI',
      post: `Assistant Sanitation Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
    {
      id: 44,
      img: assPro,
      name: 'AJIBOLA DAVID',
      post: `Assistant Protocal Coordinator`,  
      postTwo: '',  
      subPost: ''
    },
  ]

  return (
    <>

      <main className={styles.aboutPage}>
        <section className="container">
            <div className={styles.heroSection}>
          <img src={HeroImg} alt="RCCF logo" className={styles.heroImage} />
          <div className={styles.heroText}>
            <h2>TRANSFORMATION CHAPEL</h2>
            <h3>THE REDEEMED CHRISTIAN FELLOWSHIP</h3>
            <h4>University of Ilesa Chapter</h4>
            <h4>Ilesa, Osun State — Nigeria</h4>
          </div>
            </div>
        </section>

        <div className='container'>
            <div className={styles.aboutSection}>
                <h2>How We Started</h2>
                <p>Our fellowship, The Redeemed Christian Fellowship University of Ilesa, Transformation Chapel, stands as the happiest family on campus. We help students understand the reality of Christ. We teach truth with clarity. We create an environment where every student grows. We build a culture that honors God. We keep our focus on spiritual growth and unity. <br />

                Our Bible Study tagged Digging Deep gives students a better understanding of God’s word. We explain scripture with clarity. We answer questions that shape spiritual maturity. We help students apply the word in daily life. Our prayer meeting helps us seek the face of the Father. We grow stronger as we pray together. <br />

                Our mission of Aggressive Evangelism drives us beyond the campus. We reach people who need salvation. We speak to students, workers, traders, old people, and young people. We teach the message of Christ with clarity. We share testimony that leads hearts to truth. We trust God to touch lives through every outreach. <br />

                Our workforce stands united. Every department serves with purpose. Every worker supports the mission and vision of the fellowship. New students will feel God’s presence in a new dimension. They will find growth and direction. They will join a family that welcomes them with love.</p>
            </div>
        </div>

        <div className='container'>
            <div className={styles.aboutSection}>
                <h2>Our Mission</h2>
                <div>
                    <h4>Holiness</h4>
                    <p>Holiness stands at the center of our mission as RCF University of Ilesa chapter, Transformation Chapel. We choose a life that honors God in our conduct. We keep our thoughts clean and our actions sincere. We follow the teachings of Jesus in our decisions. We build strength through prayer and the Word. We show love in our relationships. We reject habits that oppose God's standards. We hold to scriptures like 1 Peter 1:16 and Psalm 24:3 to 4.</p>

                    <h4>Reaching To Unbelievers</h4>
                    <p>We reach unbelievers across nations with the message of Jesus Christ our Lord. We speak the gospel with clarity in every region. We equip members to present the truth with boldness. We support missions with prayer and resources. We form relationships that lead people to Christ. We organize outreach that draws hearts to the cross. We ask God to open doors for salvation everywhere. We hold to Mark 16:15 and Romans 10:14 as we pursue souls.</p>

                    <h4>Aggressive Evangelism</h4>
                    <p>We expand our mission by reaching students who need Christ. We invite them into a fellowship where they grow in truth. We stay present on campus with steady outreach. We place teams in hostels, lecture halls, and gathering points. We guide newcomers with clear teaching on salvation. We build a welcoming environment that encourages commitment. We strengthen our fellowship through unity and service. We stand on Matthew 28:19 and Acts 1:8 as we pursue aggressive evangelism.</p>
                </div>
            </div>
        </div>

        <div className='container'>
            <div className={styles.aboutSection}>
                <h2>Our Vision</h2>
                <div>
                    <h4>To make heaven</h4>
                    <p>ur vision is to live a life that honors God daily. We pursue holiness in thoughts, words, and actions. We cultivate a deep relationship with Jesus through prayer and the Word. We commit to obedience and righteousness in every decision. We focus on eternal rewards, keeping heaven as our ultimate goal.</p>

                    <h4>To take as many as possible with us</h4>
                    <p>We aim to reach unbelievers with the gospel of Christ. We engage others through teaching, fellowship, and outreach. We train members to share salvation boldly on campus and beyond. We build a welcoming environment that encourages commitment and growth. We trust God to use our efforts to lead many to eternal life.</p>
                </div>
            </div>
        </div>
        
        <div className='container'>
          <div className={styles.aboutSection}>
            <h2>Our Leader</h2>
            <div className={styles.leadersGrid}>
              {excoData.map((item, index) => (
                <div key={index} className={styles.leaderCard}>
                  <img src={item.img} alt="" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.post}</p>
                    <p className={styles.p2}>{item.postTwo}</p>
                    <p className={styles.p2}>{item.subPost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </main >
    </>
  )
}