document.addEventListener("DOMContentLoaded", () => {
    // Newsletter form validation =========================================================
    const form = document.querySelector("form");
    const error = document.querySelector(".error");
    const email = document.getElementById("email");
    const successAlert = document.querySelector(".success-alert");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailValue = email.value;

        if (emailValue === "" || !checkEmail(emailValue)) {
            error.textContent = "* Valid email is required!";
            setErrorStyle(email);
        } else {
            email.value = "";
            opacityHideAndShow();
            emailInitialStyle(email);
        }
    });

    email.addEventListener("input", () => {
        emailInitialStyle(email);
    });

    const closeBtn = document.querySelector(".close-btn");

    const opacityHideAndShow = () => {
        successAlert.style.opacity = 1;
        setTimeout(() => {
            successAlert.style.opacity = 0;
        }, 5000);
    };

    closeBtn.addEventListener("click", () => {
        closeBtn.parentElement.style.opacity = 0;
    });

    const checkEmail = (email) => {
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regEx.test(email);
    };

    const emailInitialStyle = (email) => {
        email.style.backgroundColor = "var(--clr-bg)";
        email.style.color = "var(--clr-text-dark)";

        error.textContent = "";
    };

    const setErrorStyle = (email) => {
        email.style.backgroundColor = "#FFEADD";
        email.style.color = "red";
    };

    // For dynamic objects ==================================
    const whySectionColumn = document.querySelector(".why-section-col");

    const createProjectStrength = (span, h3, p) => {
        const whySectionRow = document.createElement("div");
        whySectionRow.className = "why-section-row";

        whySectionRow.innerHTML = `
          <div class="row-title">
            <span>${span}</span>
            <h3 class="strength">${h3}</h3>
          </div>
          <p>${p}</p>
        `;

        return whySectionRow;
    };

    // Info's objects
    const whyInfos = [{
            span: "01",
            h3: "Exclusive Contents",
            p: " <span>Secret<em class='black'>Verse</em></span> partners with renowned \
          authors and publishes exclusive content, giving users access to compelling \
          stories they won't find anywhere else.",
        },
        {
            span: "02",
            h3: "Personalized Story Recommendations",
            p: "Our app utilizes advanced algorithms to deliver personalized story \
          recommendations tailored to each user's preferences, ensuring a highly \
          tailored and engaging reading experience.",
        },
        {
            span: "03",
            h3: "Seamless Cross-Platform Experience",
            p: "Whether on mobile, tablet, or web, our app offers a seamless user \
          experience across multiple devices, allowing users to continue their \
          reading or writing seamlessly on any platform.",
        },
        {
            span: "04",
            h3: "Community and Feedback",
            p: "Our app fosters a vibrant community of storytellers and readers, \
          providing a space for users to connect, share ideas, and receive feedback on their stories.",
        },
        {
            span: "05",
            h3: "Data Privacy and Security",
            p: "We prioritize the privacy and security of our users' data, \
          implementing robust measures to protect their personal information \
          and ensure a safe digital environment.",
        },
    ];

    whyInfos.forEach((info) => {
        const {
            span,
            h3,
            p
        } = info; // Destructure whyInfos objects then...
        const infoElement = createProjectStrength(span, h3, p); // Call function created above (createProjectStrength)
        whySectionColumn.appendChild(infoElement);
    });

    // For creating accordion ===============================================
    const createAccordion = (question, answer) => {
        const accordion = document.createElement("div");
        accordion.className = "accordion";

        accordion.innerHTML = `
          <div class="query-container">
              <button type="button" class="accord-question">${question}</button>
              <span>&plus;</span>
          </div>
          <div class="accordion-panel">
              <p>${answer}</p>
          </div>`;

        return accordion;
    };

    // Q and A objects for FAQ
    const accordionItem = [{
            question: "How do I share a story?",
            answer: "Sharing story on our app is simple. Just sign up for an account, \
          after you sign up you'll be redirected to library. Then click 'Upload Story'.",
        },
        {
            question: "Are there different genres available?",
            answer: "Yes! Our app offers a wide range of genres to suit diverse reading \
          preferences. Whether you enjoy fantasy, romance, mystery, science fiction, \
          or any other genre, you'll find a selection of captivating stories to explore.",
        },
        {
            question: "How does the personalized recommendation system work?",
            answer: "Our personalized recommendation system utilizes advanced algorithms \
          that analyze your reading preferences, story ratings, and other factors \
          to suggest stories tailored to your interests. The more you read and \
          engage with the app, the better the recommendations become. ",
        },
        {
            question: "Can I read stories offline?",
            answer: "Currently, our app requires an internet connection to access and read stories. ",
        },
        {
            question: "Can I provide feedback or report issues on your app?",
            answer: "Absolutely! We value user feedback and encourage you to provide your \
          suggestions, report any issues, or seek assistance through our customer \
          support channels. We strive to continuously improve the app based on user feedback. ",
        },
    ];

    // Destructure the object accordionItem
    const accordionSection = document.querySelector(".accordion-section");

    accordionItem.forEach((item) => {
        const {
            question,
            answer
        } = item;
        const accordionElement = createAccordion(question, answer); // call the function created above (createAccordion)
        accordionSection.appendChild(accordionElement);
    });

    // For FAQ ACCORDION ==============================================================
    const faq = document.querySelectorAll(".query-container");
    const toggleIcon = document.querySelectorAll(".query-container span");

    faq.forEach((item) => {
        item.addEventListener("click", function() {
            this.classList.toggle("active-accordion");
            const panel = this.nextElementSibling;

            if (this.classList.contains("active-accordion")) {
                panel.classList.add("show");

                if (panel.classList.contains("show")) {
                    showSlide(panel);
                }

                toggleIcon.forEach((icon) => {
                    icon.innerHTML = "&minus;";
                });
            } else {
                panel.classList.remove("show");
                panel.style.height = 0;
                toggleIcon.forEach((icon) => {
                    icon.innerHTML = "&plus;";
                });
            }

            if (this.classList.contains("active-accordion")) {
                faq.forEach((otherItem) => {
                    if (otherItem !== this) {
                        otherItem.classList.remove("active-accordion");
                        otherItem.nextElementSibling.classList.remove("show");
                        otherItem.nextElementSibling.style.height = 0;
                        otherItem.querySelector(".query-container span").innerHTML =
                            "&plus;";
                    }
                });
            }
        });
    });

    const showSlide = (element) => {
        element.style.height = element.scrollHeight + "px";
    };
});