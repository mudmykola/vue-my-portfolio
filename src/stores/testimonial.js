import { defineStore } from 'pinia';

export const useTestimonialsStore = defineStore({
    id: 'testimonials',
    state: () => ({
        testimonials: [
            {
                text: 'He demonstrates in-depth knowledge of programming and is always ready to help with any technical issues.',
                author: 'Emily Smith',
                company: 'TechSolutions Inc',
                photo: 'src/assets/images/user-reviews/1.jpg'
            },
            {
                text: 'He works efficiently on projects, always keeps to the schedule, and collaborates productively with his colleagues. ',
                author: 'Michael Brown',
                company: 'CodeCrafters Ltd',
                photo: 'src/assets/images/user-reviews/2.jpg'
            },
            {
                text: 'He quickly understood our requirements and efficiently implemented them in high-quality software. ',
                author: 'Emily Johnson',
                company: 'WebWizards LLC',
                photo: 'src/assets/images/user-reviews/3.jpg'
            },
            {
                text: 'This is a developer you can rely on. He always meets the deadlines and ensures high quality of his work meets. ',
                author: 'David Wilson',
                company: 'Digital Dynamics Corp',
                photo: 'src/assets/images/user-reviews/4.jpg'
            },
            {
                text: 'Working with Mykola has been a very positive experience. He not only solves technical problems efficiently. ',
                author: 'Sarah Thompson',
                company: 'InnovateIT Solutions',
                photo: 'src/assets/images/user-reviews/5.jpg'
            },
            {
                text: 'He carefully studies the requirements and tasks of the project to ensure their successful implementation.',
                author: 'Jessica Davis',
                company: 'CyberGenius Technologies',
                photo: 'src/assets/images/user-reviews/6.jpg'
            },
            {
                text: 'He has extensive technical knowledge and excellent analytical skills that allow him to quickly find effective solutions.',
                author: 'Christopher Miller',
                company: 'ByteBuilders Group',
                photo: 'src/assets/images/user-reviews/7.jpg'
            },
            {
                text: 'He always goes the extra mile to ensure the project is completed successfully. Impressive level of efficiency and enthusiasm.',
                author: 'Amanda Taylor',
                company: 'SoftwareSphere Innovations',
                photo: 'src/assets/images/user-reviews/8.jpg'
            }
        ]
    }),
    getters: {
        groupedTestimonials() {
            const chunkSize = 4;
            const testimonials = this.testimonials;
            const grouped = [];

            for (let i = 0; i < testimonials.length; i += chunkSize) {
                grouped.push(testimonials.slice(i, i + chunkSize));
            }

            return grouped;
        }
    }
});