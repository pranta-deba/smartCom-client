const useAboutData = () => {
    const aboutData = [
        {
            "title": "User-Friendly",
            "description": "Our platform is designed with you in mind. With an intuitive interface and easy navigation, you can access all the services you need without any hassle."
        },
        {
            "title": "Smart",
            "description": "Utilizing cutting-edge technology, our services adapt to your needs, offering personalized recommendations and intelligent solutions for your convenience."
        },
        {
            "title": "Powerful",
            "description": "Built on a robust infrastructure, our services ensure high performance and reliability, handling your most demanding tasks with ease."
        },
        {
            "title": "Secure",
            "description": "Your security is our priority. We implement top-notch security measures to protect your data and ensure your peace of mind."
        }
    ]
    const works = [
        {
            "id": 1,
            "title": "Sign Up",
            "description": "Register quickly and easily to get started. Simply provide your basic information and verify your email to create an account."
        },
        {
            "id": 2,
            "title": "Create",
            "description": "Set up your profile and preferences. Customize your settings to tailor the app experience to your needs."
        },
        {
            "id": 3,
            "title": "Compose",
            "description": "Craft your content or service request using our intuitive tools. Add details, format as needed, and get ready to send."
        },
        {
            "id": 4,
            "title": "Send",
            "description": "Submit your request or share your content with a single click. Our system ensures swift and secure delivery to the intended recipient."
        }
    ]

    const packages = [
        {
            'type': "Basic",
            'employees': 8,
            'amount': 5,
            'limitation': "Limited",
            'db': '5 Databases',
            'expired': "30 days",
        },
        {
            'type': "Pro",
            'employees': 10,
            'amount': 8,
            'limitation': "Limited",
            'db': '10 Databases',
            'expired': "30 days",
        },
        {
            'type': "Unlimited",
            'employees': 20,
            'amount': 15,
            'limitation': "Unlimited",
            'db': '100 Databases',
            'expired': "30 days",
        }
    ]


    return { aboutData, works, packages }
};

export default useAboutData;