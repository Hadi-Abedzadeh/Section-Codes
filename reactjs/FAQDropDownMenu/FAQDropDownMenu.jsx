import React, {useState} from 'react';
import './FAQDropDownMenu.css'

const FAQDropdownMenu = ({profit}) => {

    const faqData = [{
        question: "صندوق سرمایه‌گذاری قابل معامله (ETF) چیست؟",
        answer: "صندوق سرمایه‌گذاری قابل معامله یا ETF، صندوق‌هایی هستند که واحدهای آن مانند سهام شرکت‌ها از طریق سامانه‌های معاملات آنلاین تمامی کارگزاری‌ها خرید و فروش‌ می‌شود."
    }, {
        question: "چطور می‌توان در صندوق سرمایه‌گذاری لبخند فارابی سرمایه‌گذاری کرد؟",
        answer: "مشتریان کارگزاری فارابی با مراجعه به سامانه فارابیکسو، می‌توانند نسبت به خرید واحدهای لبخند اقدام کنند. همچنین سایر افراد نیز می‌توانند از طریق سامانه معاملات آنلاین تمامی کارگزاری‌ها و جستجوی نماد «لبخند» نسبت به خرید واحدهای این صندوق اقدام کنند."
    }, {
        question: "آیا سرمایه‌گذاری در صندوق لبخند نیاز به کد بورسی دارد؟",
        answer: "بلی، اگر تاکنون کد بورسی خود را دریافت نکرده‌اید، هم‌اکنون می‌توانید از طریق کارگزاری فارابی به‌صورت کاملا رایگان ثبت‌نام کرده و کد بورسی خود را دریافت کنید."
    }, {
        question: "آیا برای سرمایه‌گذاری در صندوق لبخند باید در کارگزاری فارابی حساب داشته باشم؟",
        answer: "با توجه به اینکه صندوق لبخند از نوع صندوق‌های سرمایه‌گذاری قابل‌معامله است، به‌سادگی می‌توانید با جستجوی نماد «لبخند» در سامانه معاملات آنلاین همه کارگزاری‌ها، نسبت به خرید واحدهای این صندوق اقدام کنید."
    }, {
        question: "سود صندوق درآمد ثابت لبخند فارابی چقدر است؟",
        answer: "سود صندوق قابل معامله لبخند فارابی به صورت روزشمار محاسبه می‌شود. با توجه به عملکرد این صندوق در ماه‌های اخیر، پیش‌بینی می‌شود بازدهی آن " + profit + " درصد سالانه باشد."
    }];

    const [openIndex, setOpenIndex] = useState(0); // آیتم اول باز است

    const toggleMenu = (index) => {
        // اگر آیتم باز شده، همان آیتم فعلی است، آن را ببندید
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (<div className="faq-dropdown" style={{padding: '50px'}}>
        <h2 className="faq-title">سوالات متداول</h2>
        <ul className="faq-list">
            {faqData.map((item, index) => (<li className="liStyle" key={index}>
                <button onClick={() => toggleMenu(index)} className="faq-question">
                    {openIndex === index ? '-' : '+'} {item.question}
                </button>
                <ul className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                    <li>{item.answer}</li>
                </ul>
            </li>))}
        </ul>
    </div>);
};

export default FAQDropdownMenu;
