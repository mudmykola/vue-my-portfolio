import {defineStore} from 'pinia';

export const usePortfolioStore = defineStore('portfolio', {
    state: () => ({
        filters: ['All', 'Shopify', 'Landing', 'Vue SPA'],
        selectedFilter: 'All',
        selectedProject: null,
        projects: [
            {
                name: 'Airmazing E-Commerce Bubble House',
                category: 'Shopify',
                image: '1w.png',
                images: ['1.png', '4.png', '3.png'],
                description: 'The design, structure, and development were completed in a week.',
                descriptionFull: 'Developed using HTML, CSS, JS, Liquid, Shopify API, it has a user-friendly interface with clear navigation, a dynamic product catalog with filtering and sorting, detailed product pages with high-quality visuals and descriptions, a shopping cart, and a secure checkout process. The platform is also optimized for performance and SEO.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://www.airmazing.us'
            },
            {
                name: 'Stony E-Commerce Boards',
                category: 'Shopify',
                image: '1ee.png',
                images: ['1e.png', '2e.png', '3e.png', '4e.png'],
                description: 'Design, development, functionality, marketing, and SEO were created.',
                descriptionFull: 'Developed an e-commerce store on the Shopify platform with a dynamic catalog, filtering, detailed product pages, and secure payment. Used HTML, CSS, JS, Liquid and SEO optimization.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://stony.store/'
            },
            {
                name: 'Flampic E-Commerce is a functional wooden things',
                category: 'Shopify',
                image: '1rrr.png',
                images: ['1r.png', '2r.png', '3r.png', '4r.png'],
                description: 'Embodiment of function and design.',
                descriptionFull: 'Developed a modern online store based on Shopify, using advanced technologies to ensure a pleasant user experience and high sales. He used HTML, CSS, JavaScript, and Liquid to create a dynamic interface with clear navigation and convenient search. The product catalog is equipped with filters and sorting, which allows customers to easily find the items they need. Each product page contains detailed descriptions, specifications, and high-quality images so that customers can make an informed purchase decision. A secure checkout process with Shopify API integration guarantees the reliability of transactions. In addition, the store is optimized for search engines (SEO), which ensures its visibility to potential customers.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://flampic-stores.myshopify.com/'
            },
            {
                name: 'Discount Appliance Deport E-Commerce',
                category: 'Shopify',
                image: '1ttt.png',
                images: ['1t.png', '2t.png', '3t.png', '4t.png'],
                description: 'Design, development, functionality, marketing, and SEO were created.',
                descriptionFull: 'He developed an online store on the Shopify platform that combines elegant design, user-friendly interface, high functionality, and efficiency.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://household-appliances-stores.myshopify.com/'
            },
            {
                name: 'Bella Verde E-Commerce',
                category: 'Shopify',
                image: '1yyy.png',
                images: ['1y.png', '2y.png', '3y.png', '4y.png'],
                description: 'Redesigned, added new functionality, changed the look of the gallery, and developed new blocks.',
                descriptionFull: 'Each product page contains detailed descriptions, features, and high-quality images so that customers can make an informed purchase decision. A secure checkout process with Shopify API integration ensures that transactions are reliable. In addition, the store is optimized for search engines (SEO), which ensures its visibility to potential customers.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://bellaverde.us/'
            },
            {
                name: 'Vensa E-Commerce Jewelry',
                category: 'Shopify',
                image: '1uuu.png',
                images: ['1u.png', '2u.png', '3u.png', '4u.png'],
                description: 'We created design, development, functionality, search, filters, shopping cart, upsells, marketing, and SEO.',
                descriptionFull: 'Developed a modern online store based on Shopify, using advanced technologies to ensure a pleasant user experience and high sales. He used HTML, CSS, JavaScript, and Liquid to create a dynamic interface with clear navigation and easy search.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://vense-store.myshopify.com/'
            },
            {
                name: 'Vensa E-Commerce Jewelry',
                category: 'Vue SPA',
                image: '1uuu.png',
                images: ['1u.png', '2u.png', '3u.png', '4u.png'],
                description: 'We created design, development, functionality, search, filters, shopping cart, upsells, marketing, and SEO.',
                descriptionFull: 'Developed a modern online store based on Shopify, using advanced technologies to ensure a pleasant user experience and high sales. He used HTML, CSS, JavaScript, and Liquid to create a dynamic interface with clear navigation and easy search.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://vense-store.myshopify.com/'
            },
            {
                name: 'Discount Appliance Deport E-Commerce',
                category: 'Vue SPA',
                image: '1ttt.png',
                images: ['1t.png', '2t.png', '3t.png', '4t.png'],
                description: 'Design, development, functionality, marketing, and SEO were created.',
                descriptionFull: 'He developed an online store on the Shopify platform that combines elegant design, user-friendly interface, high functionality, and efficiency.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://household-appliances-stores.myshopify.com/'
            },
            {
                name: 'Bella Verde E-Commerce',
                category: 'Vue SPA',
                image: '1yyy.png',
                images: ['1y.png', '2y.png', '3y.png', '4y.png'],
                description: 'Redesigned, added new functionality, changed the look of the gallery, and developed new blocks.',
                descriptionFull: 'Each product page contains detailed descriptions, features, and high-quality images so that customers can make an informed purchase decision. A secure checkout process with Shopify API integration ensures that transactions are reliable. In addition, the store is optimized for search engines (SEO), which ensures its visibility to potential customers.',
                technology: 'HTML, CSS, JS, Liquid, Shopify Cli',
                link: 'https://bellaverde.us/'
            }
        ],
    }),
    actions: {
        changeFilter(filter) {
            this.selectedFilter = filter;
        },
        showModal(project) {
            this.selectedProject = project;
        },
        closeModal() {
            this.selectedProject = null;
        },
    },
    getters: {
        filteredProjects() {
            if (this.selectedFilter === 'All') {
                return this.projects;
            } else {
                return this.projects.filter(project => project.category === this.selectedFilter);
            }
        },
    },
});