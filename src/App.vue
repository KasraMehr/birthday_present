<template>
    <div class="horizontal-resume">
        <!-- نوار ناوبری ثابت -->
        <nav class="resume-nav">
            <div class="nav-logo">ZT</div>
            <ul class="nav-links">
                <li v-for="(section, index) in sections" :key="index"
                    @click="scrollToSection(index)"
                    :class="{active: activeSection === index}">
                    {{ section.name }}
                </li>
            </ul>
            <div class="nav-birthday" @click="showBirthdayCard">
                <i class="fas fa-birthday-cake"></i>
            </div>
        </nav>

        <!-- محتوای اسکرول افقی -->
        <div class="resume-scroller" ref="scroller">
            <!-- بخش معرفی -->
            <section class="resume-section intro-section" data-section="0">
                <div class="intro-content">
                    <div class="intro-text">
                        <h1>
                            <span class="name-part">{{ nameParts.first }}</span>
                            <span class="name-part">{{ nameParts.last }}</span>
                        </h1>
                        <h2>{{ title }}</h2>
                        <div class="intro-bio">{{ bio }}</div>
                        <div class="intro-actions">
                            <button class="download-btn" @click="downloadResume">
                                دانلود رزومه <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div class="intro-visual">
                        <div class="visual-container">
                            <div class="tech-circle" v-for="(tech, index) in mainTech" :key="index"
                                 :style="{ ...techCircleStyle(index), background: tech.color }">
                                <div class="tech-icon">
                                    <i :class="tech.icon"></i>
                                </div>
                                <div class="tech-name">{{ tech.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- بخش مهارت‌ها -->
            <section class="resume-section skills-section" data-section="1">
                <div class="skills-container">
                    <h3 class="section-title">توانایی‌های حرفه‌ای</h3>
                    <div class="skills-grid">
                        <div v-for="(skill, index) in skills" :key="index"
                             class="skill-card"
                             @mouseenter="activateSkill(index)"
                             @mouseleave="deactivateSkill">
                            <div class="skill-header">
                                <div class="skill-icon" :style="{background: skill.color}">
                                    <i :class="skill.icon"></i>
                                </div>
                                <h4>{{ skill.name }}</h4>
                            </div>
                            <div class="skill-level">
                                <div class="level-bar" :style="{width: skill.level + '%'}"></div>
                            </div>
                            <div class="skill-details" v-if="activeSkill === index">
                                <ul>
                                    <li v-for="(item, i) in skill.items" :key="i">{{ item }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- بخش تجربیات -->
            <section class="resume-section experience-section" data-section="2">
                <div class="exp-timeline">
                    <div class="timeline-bar"></div>
                    <div v-for="(exp, index) in experiences" :key="index"
                         class="timeline-item"
                         :style="timelineItemStyle(index)">
                        <div class="exp-card">
                            <div class="exp-period">{{ exp.period }}</div>
                            <h4 class="exp-position">{{ exp.position }}</h4>
                            <h5 class="exp-company">{{ exp.company }}</h5>
                            <ul class="exp-responsibilities">
                                <li v-for="(resp, i) in exp.responsibilities" :key="i">{{ resp }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- بخش پروژه‌ها -->
            <section class="resume-section projects-section" data-section="3">
                <div class="projects-container">
                    <h3 class="section-title">نمونه کارها</h3>
                    <div class="projects-slider">
                        <div v-for="(project, index) in projects" :key="index"
                             class="project-item"
                             :style="projectTransform(index)"
                             @click="openProject(index)">
                            <div class="project-image">
                                <img :src="project.image" :alt="project.name">
                            </div>
                            <div class="project-overlay">
                                <h4>{{ project.name }}</h4>
                                <p>{{ project.shortDesc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- بخش تماس -->
            <section class="resume-section contact-section" data-section="4">
                <div class="contact-container">
                    <h3 class="section-title">در تماس باشید</h3>
                    <div class="contact-methods">
                        <div v-for="(method, index) in contactMethods" :key="index"
                             class="contact-card"
                             @click="handleContact(method.type)">
                            <div class="contact-icon" :style="{background: method.color}">
                                <i :class="method.icon"></i>
                            </div>
                            <h4>{{ method.name }}</h4>
                            <p>{{ method.value }}</p>
                        </div>
                    </div>
                    <div class="birthday-message">
                        <p>{{ birthdayMessage }}</p>
                        <div class="heart-animation" @click="sendLove">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- کارت تولد پاپ آپ -->
        <div v-if="showBirthdayPopup" class="birthday-popup" @click.self="closeBirthdayCard">
            <div class="birthday-card">
                <div class="card-confetti"></div>
                <h3>تولدت مبارک عزیزم!</h3>
                <p>{{ personalizedMessage }}</p>
                <button class="close-btn" @click="closeBirthdayCard">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "زهرا سادات تقوی",
            title: "متخصص سئو و بهینه‌سازی وب‌سایت",
            bio: "متخصص سئو با ۴ سال تجربه در بهبود رتبه سایت‌ها در موتورهای جستجو، تدوین استراتژی محتوایی، و افزایش نرخ کلیک و تبدیل. مهارت در ابزارهای سئو و تحلیل رفتار کاربران.",
            activeSection: 0,
            activeSkill: null,
            activeProject: null,
            showBirthdayPopup: false,
            nameParts: {
                first: "زهرا",
                last: "تقوی"
            },
            sections: [
                { name: "معرفی", icon: "user" },
                { name: "مهارت‌ها", icon: "skills" },
                { name: "تجربیات", icon: "briefcase" },
                { name: "پروژه‌ها", icon: "project-diagram" },
                { name: "تماس", icon: "envelope" }
            ],
            mainTech: [
                { name: "Google Analytics", icon: "fas fa-chart-line", color: "#f57c00" },
                { name: "Search Console", icon: "fas fa-search", color: "#0f9d58" },
                { name: "Keyword Research", icon: "fas fa-key", color: "#4285f4" },
                { name: "Content Strategy", icon: "fas fa-file-alt", color: "#34a853" }
            ],
            skills: [
                {
                    name: "تحلیل سئو",
                    level: 90,
                    icon: "fas fa-chart-line",
                    color: "#f57c00",
                    items: [
                        "تحلیل ترافیک با Google Analytics",
                        "بررسی نرخ پرش و رفتار کاربر",
                        "شناسایی صفحات کم‌بازده",
                        "تحلیل رقبا"
                    ]
                },
                {
                    name: "بهینه‌سازی داخلی",
                    level: 85,
                    icon: "fas fa-code",
                    color: "#00796b",
                    items: [
                        "بهینه‌سازی عنوان‌ها و متا تگ‌ها",
                        "استفاده درست از تگ‌های هدینگ",
                        "لینک‌سازی داخلی اصولی",
                        "افزایش سرعت سایت"
                    ]
                },
                {
                    name: "استراتژی محتوایی",
                    level: 80,
                    icon: "fas fa-pencil-alt",
                    color: "#5e35b1",
                    items: [
                        "تدوین تقویم محتوایی",
                        "تحقیق کلمات کلیدی",
                        "تولید محتوای سئو محور",
                        "بهبود خوانایی و ساختار محتوا"
                    ]
                },
                {
                    name: "سئو تکنیکال",
                    level: 75,
                    icon: "fas fa-server",
                    color: "#6d4c41",
                    items: [
                        "ساختار URL بهینه",
                        "رفع خطاهای Crawl",
                        "کار با Robots.txt و Sitemap",
                        "ریسپانسیو بودن و Core Web Vitals"
                    ]
                }
            ],
            experiences: [
                {
                    position: "متخصص سئو ارشد",
                    company: "آژانس دیجیتال مارکتینگ روناش",
                    period: "1400-اکنون",
                    responsibilities: [
                        "مدیریت تیم سئو",
                        "افزایش رتبه و بازدید ارگانیک",
                        "ارائه گزارش‌های تحلیلی ماهانه",
                        "همکاری با تیم تولید محتوا و توسعه"
                    ]
                },
                {
                    position: "کارشناس سئو",
                    company: "استارتاپ دیجی‌فود",
                    period: "1398-1400",
                    responsibilities: [
                        "تحقیق و به‌کارگیری کلمات کلیدی هدفمند",
                        "بهینه‌سازی صفحات محصول",
                        "افزایش نرخ تبدیل با A/B تست",
                        "ایجاد بک‌لینک‌های معتبر"
                    ]
                }
            ],
            projects: [
                {
                    name: "سایت فروشگاهی برند لند",
                    shortDesc: "افزایش ترافیک ارگانیک ۲ برابری در ۶ ماه",
                    image: "@/assets/seo1.png",
                    fullDesc: "تحقیق کلمات کلیدی، بازنویسی محتوا، اصلاح ساختار سایت و بهینه‌سازی فنی باعث رشد چشمگیر سئو شد."
                },
                {
                    name: "سایت خبری سلامت‌پلاس",
                    shortDesc: "افزایش CTR با بهبود عنوان‌ها و توضیحات متا",
                    image: "@/assets/seo2.png",
                    fullDesc: "با اصلاحات محتوایی و تحلیل نرخ کلیک در GSC، نرخ CTR صفحات برتر تا ۳۰٪ افزایش یافت."
                },
                {
                    name: "وبلاگ آموزشی هوش‌یار",
                    shortDesc: "تدوین استراتژی محتوایی بر اساس ترندهای گوگل",
                    image: "@/assets/seo3.png",
                    fullDesc: "تولید محتوای سئو محور و هدفمند منجر به افزایش تعامل کاربران و کاهش نرخ پرش شد."
                }
            ],
            contactMethods: [
                {
                    name: "ایمیل",
                    value: "zahra-seo@example.com",
                    icon: "fas fa-envelope",
                    color: "#d44638",
                    type: "email"
                },
                {
                    name: "موبایل",
                    value: "0912•••••••",
                    icon: "fas fa-mobile-alt",
                    color: "#25D366",
                    type: "phone"
                },
                {
                    name: "گیتهاب",
                    value: "github.com/zahra-seo",
                    icon: "fab fa-github",
                    color: "#333",
                    type: "github"
                },
                {
                    name: "لینکدین",
                    value: "linkedin.com/in/zahra-seo",
                    icon: "fab fa-linkedin",
                    color: "#0077b5",
                    type: "linkedin"
                }
            ],
            birthdayMessage: "این رزومه متفاوت رو با تمام عشقم برات ساختم تا هم مهارت‌هام رو بهت نشون بدم هم بگم چقدر برام خاصی!",
            personalizedMessage: "عزیزم، تولدت مبارک! امیدوارم این سال جدید پر از موفقیت و شادی برات باشه. همیشه کنارت هستم و بهت افتخار می‌کنم! دوستت دارم ♥"
        };
    },
    mounted() {
        this.initScroll();
        this.initAnimations();
    },
    methods: {
        initScroll() {
            const scroller = this.$refs.scroller;

            scroller.addEventListener("scroll", () => {
                const sections = document.querySelectorAll(".resume-section");
                const scrollCenter = scroller.scrollLeft + scroller.clientWidth / 2;

                let currentSection = 0;
                let minDistance = Infinity;

                sections.forEach((section, index) => {
                    const sectionCenter = section.offsetLeft + section.offsetWidth / 2;
                    const distance = Math.abs(scrollCenter - sectionCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSection = index;
                    }
                });

                this.activeSection = currentSection;
            });
        },
        initAnimations() {
            // می‌توانید از Anime.js یا GSAP برای انیمیشن‌های پیچیده استفاده کنید
        },
        scrollToSection(index) {
            const scroller = this.$refs.scroller;
            const section = document.querySelector(`[data-section="${index}"]`);
            this.activeSection = index;
            scroller.scrollTo({
                left: section.offsetLeft,
                behavior: "smooth"
            });
        },
        techCircleStyle(index) {
            const angle = (index * 90) + 45;
            const radius = 150;
            return {
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
            };
        },
        activateSkill(index) {
            this.activeSkill = index;
        },
        deactivateSkill() {
            this.activeSkill = null;
        },
        timelineItemStyle(index) {
            return {
                top: `${index * 180 + 50}px`
            };
        },
        projectTransform(index) {
            if (this.activeProject === index) {
                return {
                    transform: "scale(1.1)",
                    zIndex: 10
                };
            } else if (this.activeProject !== null) {
                return {
                    transform: "scale(0.9)",
                    opacity: 0.7
                };
            }
            return {};
        },
        openProject(index) {
            this.activeProject = index;
        },
        handleContact(type) {
            // منطق تماس بر اساس نوع
        },
        showBirthdayCard() {
            this.showBirthdayPopup = true;
        },
        closeBirthdayCard() {
            this.showBirthdayPopup = false;
        },
        sendLove() {
            // انیمیشن قلب
        },
        downloadResume() {
            // منطق دانلود رزومه
        }
    }
};
</script>

<style scoped>
/* استایل‌های پایه */
.horizontal-resume {
    height: 100vh;
    overflow: hidden;
    font-family: 'Vazir', sans-serif;
    direction: rtl;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

/* نوار ناوبری */
.resume-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 100;
}

.nav-logo {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(135deg, #6c63ff 0%, #ff6584 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #6c63ff;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.nav-links li {
    cursor: pointer;
    position: relative;
    padding: 5px 0;
    color: #555;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.nav-links li.active,
.nav-links li:hover {
    color: #6c63ff;
}

.nav-links li.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: #6c63ff;
}

.nav-birthday {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6584 0%, #ffb347 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.nav-birthday:hover {
    transform: scale(1.1);
}

.hamburger-menu {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
}

/* اسکرولر افقی */
.resume-scroller {
    display: flex;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    padding-top: 70px;
    scroll-behavior: smooth;
}

.resume-section {
    min-width: 100vw;
    height: calc(100vh - 70px);
    scroll-snap-align: start;
    padding: 30px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

/* بخش معرفی */
.intro-section {
    background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
}

.intro-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    gap: 30px;
}

.intro-text {
    flex: 1;
    text-align: center;
}

.intro-text h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    line-height: 1.2;
}

.name-part {
    display: inline-block;
    position: relative;
}

.name-part:first-child::after {
    content: '';
    position: absolute;
    bottom: 5px;
    right: 0;
    width: 100%;
    height: 6px;
    background: rgba(108, 99, 255, 0.3);
    z-index: -1;
}

.intro-text h2 {
    font-size: 1.2rem;
    color: #6c63ff;
    margin-bottom: 20px;
    font-weight: 400;
}

.intro-bio {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    max-width: 100%;
    margin-bottom: 30px;
    padding: 0 10px;
}

.download-btn {
    background: linear-gradient(135deg, #6c63ff 0%, #8b83ff 100%);
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 30px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
}

.download-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.4);
}

.download-btn i {
    margin-left: 8px;
}

.intro-visual {
    flex: 1;
    position: relative;
    height: 300px;
    width: 100%;
}

.visual-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
}

.tech-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -40px;
    background: white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
    font-size: 0.8rem;
}

.tech-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.tech-name {
    font-size: 0.7rem;
    margin-top: 5px;
    text-align: center;
    padding: 0 5px;
    color: white;
}

/* بخش مهارت‌ها */
.skills-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.skills-container {
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #2d3748;
    position: relative;
    display: inline-block;
    text-align: center;
    width: 100%;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 25%;
    width: 50%;
    height: 4px;
    background: #6c63ff;
}

.skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.skill-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    height: auto;
    min-height: 250px;
    overflow: hidden;
}

.skill-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.skill-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    margin-left: 10px;
}

.skill-card h4 {
    font-size: 1.1rem;
    color: #2d3748;
}

.skill-level {
    height: 6px;
    background: #edf2f7;
    border-radius: 3px;
    margin-bottom: 15px;
    overflow: hidden;
}

.level-bar {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease;
}

.skill-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
}

.skill-card:hover .skill-details {
    max-height: 500px;
}

.skill-details ul {
    list-style: none;
    padding-right: 15px;
    margin-top: 10px;
}

.skill-details li {
    margin-bottom: 8px;
    position: relative;
    padding-right: 15px;
    font-size: 0.8rem;
    color: #4a5568;
}

.skill-details li::before {
    content: '•';
    position: absolute;
    right: 0;
    color: #6c63ff;
}

/* بخش تجربیات */
.experience-section {
    background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
}

.exp-timeline {
    position: relative;
    max-width: 800px;
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 20px 0;
}

.timeline-bar {
    display: none;
}

.timeline-item {
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    left: auto !important;
    right: auto !important;
    top: auto !important;
}

.exp-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    margin: 0 10px;
}

.exp-card::after {
    display: none;
}

.exp-period {
    font-size: 0.8rem;
    color: #6c63ff;
    margin-bottom: 8px;
    font-weight: bold;
}

.exp-position {
    font-size: 1.1rem;
    color: #2d3748;
    margin-bottom: 5px;
}

.exp-company {
    font-size: 0.9rem;
    color: #718096;
    margin-bottom: 12px;
    font-weight: 400;
}

.exp-responsibilities {
    list-style: none;
    padding-right: 15px;
}

.exp-responsibilities li {
    margin-bottom: 8px;
    position: relative;
    padding-right: 15px;
    font-size: 0.8rem;
    color: #4a5568;
}

.exp-responsibilities li::before {
    content: '•';
    position: absolute;
    right: 0;
    color: #6c63ff;
}

/* بخش پروژه‌ها */
.projects-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.projects-container {
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;
}

.projects-slider {
    display: flex;
    gap: 20px;
    padding: 20px 0;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.project-item {
    min-width: 250px;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    scroll-snap-align: start;
    transition: all 0.5s ease;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.project-image {
    width: 100%;
    height: 100%;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 15px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
    transform: translateY(100%);
    transition: all 0.3s ease;
}

.project-item:hover .project-overlay {
    transform: translateY(0);
}

.project-overlay h4 {
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.project-overlay p {
    font-size: 0.8rem;
    opacity: 0.9;
}

/* بخش تماس */
.contact-section {
    background: linear-gradient(135deg, #6c63ff 0%, #8b83ff 100%);
    color: white;
}

.contact-container {
    max-width: 1200px;
    width: 100%;
    padding: 0 20px;
}

.contact-methods {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.contact-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin: 0 auto 15px;
    color: white;
}

.contact-card h4 {
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.contact-card p {
    font-size: 0.8rem;
    opacity: 0.9;
}

.birthday-message {
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    line-height: 1.6;
    position: relative;
    padding: 0 10px;
}

.heart-animation {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #ff6584;
    margin: 20px auto 0;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* پاپ آپ تولد */
.birthday-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.birthday-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 100%;
    width: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: cardEntrance 0.5s ease;
}

.birthday-card h3 {
    font-size: 1.5rem;
    color: #6c63ff;
    margin-bottom: 15px;
}

.birthday-card p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
}

.close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    color: #aaa;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* رسپانسیو */
@media (min-width: 576px) {
    .resume-section {
        padding: 40px;
    }

    .intro-content {
        flex-direction: row;
        text-align: right;
    }

    .intro-text h1 {
        font-size: 3rem;
    }

    .skills-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .contact-methods {
        grid-template-columns: repeat(2, 1fr);
    }

    .project-item {
        min-width: 300px;
        height: 350px;
    }
}

@media (min-width: 768px) {
    .nav-links {
        display: flex;
    }

    .hamburger-menu {
        display: none;
    }

    .intro-text h1 {
        font-size: 3.5rem;
    }

    .skills-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .exp-timeline {
        height: 100%;
    }

    .timeline-bar {
        display: block;
    }

    .timeline-item {
        position: absolute;
        width: 45%;
        margin-bottom: 0;
    }

    .timeline-item:nth-child(odd) {
        right: 55%;
    }

    .timeline-item:nth-child(even) {
        left: 55%;
    }

    .timeline-item .exp-card::after {
        display: block;
    }

    .contact-methods {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 992px) {
    .intro-content {
        flex-direction: row;
        text-align: right;
    }

    .intro-text h1 {
        font-size: 4rem;
    }

    .skills-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .visual-container {
        width: 400px;
        height: 400px;
    }

    .tech-circle {
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
    }

    .project-item {
        min-width: 350px;
        height: 400px;
    }
}

@media (max-width: 767px) {
    .nav-links {
        display: none;
        position: absolute;
        top: 70px;
        right: 0;
        left: 0;
        background: white;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }

    .nav-links.active {
        display: flex;
    }

    .hamburger-menu {
        display: block;
    }

    .resume-scroller {
        scroll-snap-type: none;
    }

    .resume-section {
        height: auto;
        min-height: calc(100vh - 70px);
        scroll-snap-align: none;
    }
}

/* انیمیشن‌ها */
@keyframes cardEntrance {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>