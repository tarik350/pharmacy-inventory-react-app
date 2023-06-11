import React from "react";

const About = () => {
  return (
    <div className="flex mx-[40px] justify-center items-center py-12  ">
      <div className="flex flex-1  rounded-xl  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500">
        <div className=" flex-col relative  bg-white w-full   m-[3px] border-2 p-12  shadow-2xl rounded-lg ">
          <h1 className="heading-one">About Us</h1>
          <h2 className="text-[18px] text-gray-500  italic">
            Samaritan: Empowering Efficient Pharmacy Inventory Management
          </h2>
          <main className="my-8">
            <h2 className="heading-two">Introduction</h2>
            <p className="paragraph">
              Welcome to Samaritan, a revolutionary pharmacy inventory web
              application designed to streamline and optimize inventory
              management for pharmacies of all sizes. Our mission is to empower
              pharmacies with the tools and technologies necessary to enhance
              efficiency, reduce costs, and ensure seamless operations. With
              Samaritan, we aim to transform the way pharmacies handle inventory
              management, helping them save time, increase profitability, and
              ultimately focus on what matters most: patient care.
            </p>
            <h2 className="heading-two">Our Vision</h2>
            <p className="paragraph">
              At Samaritan, we envision a future where pharmacies can operate at
              their maximum potential, free from the burden of manual inventory
              management. We believe that every pharmacy should have access to
              user-friendly, robust, and affordable solutions that can automate
              tedious tasks and provide actionable insights. By leveraging
              cutting-edge technology, we strive to be the industry leader in
              empowering pharmacies to thrive in today's dynamic healthcare
              landscape.
            </p>
            <h2 className="heading-two">Efficient Inventory Management</h2>
            <p className="">
              Pharmacy inventory management is a critical aspect of running a
              successful pharmacy. From tracking stock levels to managing
              expiration dates, it can be a complex and time-consuming process.
              Samaritan offers a comprehensive suite of features and
              functionalities specifically designed to simplify inventory
              management. Our intuitive interface enables pharmacists and
              pharmacy staff to effortlessly monitor stock levels, track
              products, and generate insightful reports.
            </p>
            <h2 className="heading-two">Key Features</h2>
            <div className="list-decimal">
              <li className="paragraph">
                Inventory Tracking: Samaritan provides real-time visibility into
                your pharmacy's inventory. With advanced barcode scanning
                capabilities, you can easily monitor stock levels, track product
                movement, and streamline the ordering process. Set automatic
                reorder points to ensure you never run out of essential
                medications.
              </li>
              <li className="my-8 paragraph">
                Expiration Management: Our application keeps you updated on
                product expiration dates, helping you avoid costly losses due to
                expired inventory. Receive automated alerts and generate reports
                to proactively manage and mitigate expired products.
              </li>
              <li className="paragraph mb-8">
                Product Categorization: Samaritan allows you to categorize your
                inventory based on various parameters such as medication type,
                brand, strength, and dosage form. This feature facilitates quick
                and accurate retrieval of products, saving valuable time during
                prescription dispensing.
              </li>
              <li>
                Reporting and Analytics: Make data-driven decisions with
                Samaritan's comprehensive reporting and analytics tools. Gain
                valuable insights into your pharmacy's inventory turnover,
                profit margins, and more. Identify trends, optimize purchasing,
                and improve overall operational efficiency.
              </li>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default About;
