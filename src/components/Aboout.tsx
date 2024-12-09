import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="container text-center">
                <h3 className="display-4 lh-1">About</h3>
                <p>This web application is designed to offer a comprehensive content management system, allowing business users to easily publish and manage content on a website. The platform enables users to publish articles, images, and other types of content that will be made available across different sections of the site.

                    With an intuitive interface, the app simplifies the process of creating, editing, and organizing content, making it accessible to users with various technical backgrounds. Whether you're a small business or a large enterprise, this app provides a powerful tool to manage your online presence efficiently and effectively.</p>
            </div>

        </>
    );
}

export default About;