const withLess = require("@zeit/next-less");

/* Required to be able to work with LESS. */
module.exports = withLess({
	cssModules: true,
	webpack: (config) =>
	{
		config.module.rules.push({
			test: /\.(png|jpg)$/,
			use: {
				loader: "url-loader",
				options: {
					esModule: false,
				},
			},
		});

		return config;
	},
});
