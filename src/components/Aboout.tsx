import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="container text-center appMargin">
                <h3 className="display-4 lh-1">About</h3>
                <p>Bcard is a revolutionary web application designed to simplify the way businesses connect with potential customers. Our platform allows businesses to easily create and publish their "business card" — an interactive and informative profile that includes key details about their services, products, contact information, and much more.</p>

                <h4>How It Works</h4>   
                <p>Businesses can easily register on Bcard, upload content, and manage their profile through a user-friendly content management system. The content can be displayed across various sections of the site, making it easy for users to discover the right business based on their needs.</p>
                    
                <h4>For users </h4> 
                <p>Bcard offers an intuitive search experience to find businesses from a wide range of categories. Whether you're looking for a local restaurant, a plumber, or any other service, Bcard helps you quickly find the information you're looking for, all in one place.</p>

                <h4>Our Mission</h4> 
                <p>At Bcard, our goal is to create a seamless connection between businesses and customers. We believe that finding the right service should be easy and convenient. By providing businesses with an effective platform to showcase their offerings, and allowing users to search and find businesses that meet their needs, Bcard aims to become the go-to directory for both businesses and consumers.</p>
            </div>

        </>
    );
}

export default About;