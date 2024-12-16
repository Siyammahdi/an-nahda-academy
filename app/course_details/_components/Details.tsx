"use client"
import React from "react";
export default function Details() {
   const [selected, setSelected] = React.useState("photos");
   return (
      <div className="">
         <p className="text-justify font-bold my-5">Want to Become Successful Parents? </p>
         <p> Join An Nahda Islamic Academy&apos;s Parenting Course!
            Parenting is a challenging yet noble responsibility. As parents, your role is pivotal in ensuring your child&apos;s physical, mental, and spiritual development. However, in today&apos;s fast-paced world, where technology, time constraints, and modern life complexities add new dimensions to parenting, traditional methods are no longer sufficient for raising children effectively.
            This is where An Nahda Islamic Academy&apos;s Parenting Course provides a unique opportunity. Our course is designed to equip parents with the knowledge and skills to play an impactful role in their children&apos;s physical, mental, social, and spiritual growth.
         </p>
         <p className="font-bold my-5"> Course Overview:</p>

         <span className="mb-3">At An Nahda Islamic Academy, we&apos;ve integrated the teachings of Islam with modern psychology to create a comprehensive parenting guideline. Our course is specially crafted to:</span>
         <ol className='ml-5 list-decimal'>
            <li >Emphasize the character and responsibilities of parents.</li>
            <li >Teach strategies to address psychological challenges specific to different age groups.</li>
            <li >Guide parents on incorporating spiritual and moral education into their children&apos;s lives.</li>
         </ol>

         <p className="text-justify font-bold my-5">What Participants Will Gain</p>
         <span className="mb-3">By joining our parenting course, you will receive:</span>
         <ul className='ml-5 list-disc'>
            <li>Practical advice based on real-life examples and experiences.</li>
            <li>Special sessions to reshape perspectives and approaches..</li>
            <li>Workshops designed to enhance personal parenting skills.</li>
         </ul>


         <p className="text-justify font-bold my-5">What Makes Our Approach Unique?</p>
         <span className="mb-3">Unlike many parenting courses that focus solely on theoretical knowledge, An Nahda Islamic Academy takes a practical and actionable approach. Our sessions include:</span>
         <ol className='ml-5 list-decimal'>
            <li>Interactive Learning: Workshops, group discussions, and real-life case studies.</li>
            <li>Value-Based Guidance: Insights into building life around Islamic principles.</li>
            <li>A Blend of Tradition and Modernity: Techniques for fostering spiritual growth while tackling modern challenges.</li>
         </ol>




         <p className="text-justify font-bold my-5">Why Our Course is Beneficial</p>
         <ul className='ml-5 list-disc'>
            <li>Islamic Perspective: Instilling proper values in children is more crucial than ever in today&apos;s world. Our course places special emphasis on this.</li>
            <li>Practical Solutions: Learn actionable strategies for resolving real-world issues.</li>
            <li>Individualized Focus: Every child is unique, with distinct personalities and needs. Our course is designed with this in mind.</li>
            <li>Parental Well-being: Alongside raising children, we highlight the mental and spiritual well-being of parents themselves.</li>
         </ul>


         <p className="text-justify font-bold my-5">Our Message to Parents</p>

         <p>Becoming a successful parent requires more than just love and affection. You need to be aware, creative, and well-informed. Al Nahda Islamic Academy&apos;s Parenting Course provides you with the guidance to brighten your child&apos;s future.
            Your child is your greatest asset. The more thoughtful and effective your role is at every stage of their life, the more prosperous their future will be. Join our course today to enhance your parenting skills and make a lasting difference in your child&apos;s life.</p>

         <p className="text-justify font-bold my-5">Enroll now and embark on your journey to becoming a successful parent!</p>

      </div >
   );
};

