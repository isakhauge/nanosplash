import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Nanosplash',
	description: 'The tiny loading screen for web artisans',
	base: '/nanosplash/docs/.vitepress/dist/',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Get started', link: '/api/start/install' },
			{ text: 'Playground', link: '/api/start/playground' },
			{ text: 'API documentation', link: '/api/doc/show' },
		],

		sidebar: {
			'/api/': [
				{
					text: 'Get started',
					items: [
						{
							text: 'Installation',
							link: '/api/start/install',
						},
						{
							text: 'Usage',
							link: '/api/start/usage',
						},
						{
							text: 'Playground',
							link: '/api/start/playground',
						},
					],
				},
				{
					text: 'API Documentation',
					items: [
						{
							text: 'Methods',
							items: [
								{
									text: 'Show',
									link: '/api/doc/show',
								},
								{
									text: 'Hide',
									link: '/api/doc/hide',
								},
							],
						},
					],
				},
				{
					text: 'Features',
					link: '/api/start/features',
				},
			],
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/isakhauge/nanosplash' },
			{ icon: 'twitter', link: 'https://twitter.com/isakhauge' },
			{ icon: 'linkedin', link: 'https://www.linkedin.com/in/isakhauge' },
		],

		search: {
			provider: 'local',
		},

		footer: {
			message:
				'Made with 🤍 by <a href="https://twitter.com/isakhauge">Isak Hauge</a>',
		},
	},
})
