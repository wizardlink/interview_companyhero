const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

// Custom ant.design configuration.
const themeVariables = lessToJS(
	fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8"),
);

/* Required to be able to work with LESS. */
module.exports = withLess({
	lessLoaderOptions: {
		javascriptEnabled: true,
		modifyVars: themeVariables, // Apply custom config.
	},
	webpack: (config) =>
	{
		const antStyles = /antd\/.*?\/style.*?/;
		const origExternals = [...config.externals];

		config.externals = [
			(context, request, callback) =>
			{
				if (request.match(antStyles)) return callback();
				if (typeof origExternals[0] === "function")
				{
					origExternals[0](context, request, callback);
				}
				else
				{
					callback();
				}
			},
			...(typeof origExternals[0] === "function" ? [] : origExternals),
		];

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
	typescript:
	{
		ignoreBuildErrors: true,
	},
});
