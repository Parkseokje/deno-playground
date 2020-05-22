const encoder = new TextEncoder()

const greetText = encoder.encode('Hello World\nMy name is Seokje.');

await Deno.writeFile('samples/greet.txt', greetText);