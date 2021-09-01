const decoder = new TextDecoder();
const indexTmplData = await Deno.readFile('./index.tmpl.html');
const indexTmplStr = decoder.decode(indexTmplData);
const includeMatches = indexTmplStr.matchAll(/<include src="([./\w-]+.tmpl.html)">/g);

let output = indexTmplStr;

for (const matchArray of includeMatches) {
	const [match, path] = matchArray;
	const includeTmplData = await Deno.readFile(path);
	const includeTmplStr = decoder.decode(includeTmplData);
	output = output.replace(match, includeTmplStr);
}

await Deno.writeTextFile('index.html', output);