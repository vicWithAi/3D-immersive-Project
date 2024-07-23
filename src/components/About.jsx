/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* import Tilt from "react-tilt"; */
import { motion } from "framer-motion";
import Tilt from 'react-parallax-tilt';
import { styles } from "../styles";
import { services, TheTeam } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
       
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Transform your brand into an unforgettable experience with our immersive video production services.
         Let us craft narratives that not only captivate but also make your audience 
         truly believe in your brand's story.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <motion.div variants={textVariant()}>
       
        <h2 className={styles.sectionHeadText}>Meet the Team.</h2>
      </motion.div>



      <div className="mt-20 flex flex-wrap gap-10">
        {TheTeam.map((TheTeam, index) => (
          <TheTeamCard key={TheTeam.title} index={index} {...TheTeam} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
