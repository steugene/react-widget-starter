#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const https = require("https");
const { exec } = require("child_process");

const scripts = `
"start": "webpack serve --config webpack.dev.js --open",
"build": "NODE_ENV=production webpack --config webpack.config.prod.js"
`;

console.log("Initializing project..");

/** create folder & init project */
exec(
	`mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
	(initErr) => {
		if (initErr) {
			console.error(`Everything was fine, then it wasn't: ${initErr}`);
			console.log('Reverting...');
			`rm -r ${process.argv[2]}`
			return;
		}
		const packageJSON = `${process.argv[2]}/package.json`;
		/** replace default scripts */
		fs.readFile(packageJSON, (err, file) => {
			if (err) throw err;
			const data = file
				.toString()
				.replace(
					'"test": "echo \\"Error: no test specified\\" && exit 1"',
					scripts
				)
				.replace(
					'"main": "index.js"',
					`"main": "index.tsx"`
				)
			fs.writeFile(packageJSON, data, (err2) => err2 || true);
		});

		const filesToCopy = [
			"webpack.config.js",
			"webpack.config.prod.js",
			"webpack.dev.js",
			"jest.config.js",
			"tsconfig.json",
			".babelrc",
			".eslintignore",
			".eslintrc.js",
			".prettierrc",
		];

		for (let i = 0; i < filesToCopy.length; i += 1) {
			fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`)).pipe(
				fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`)
			);
		}
		/** get gitignore from github */
		https.get(
			"https://github.com/steugene/react-widget-starter/master/.gitignore",
			(res) => {
				res.setEncoding("utf8");
				let body = "";
				res.on("data", (data) => {
					body += data;
				});
				res.on("end", () => {
					fs.writeFile(
						`${process.argv[2]}/.gitignore`,
						body,
						{ encoding: "utf-8" },
						(err) => {
							if (err) throw err;
						}
					);
				});
			}
		);

		console.log("npm init -- done\n");

		exec(
			`cd ${process.argv[2]}`,
			() => {
				console.log("Copying additional files..");
				// копирование дополнительных файлов с кодом
				fs.copy(path.join(__dirname, "../public"), `${process.argv[2]}/public`)
				fs.copy(path.join(__dirname, "../src"), `${process.argv[2]}/src`)
					.then(() =>
						console.log(
							`All done!\n\nYour project is now ready\n\nUse the below command to run the app.\n\ncd ${process.argv[2]}\n npm i\n npm start`
						)
					)
					.catch((err) => {
						console.error(`Some error occurred: ${err}`);
						exec(`rm -r ${process.argv[2]}`);
					});
			}
		);
	}
);
