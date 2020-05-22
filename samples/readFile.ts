let file = await Deno.open('samples/greet.txt');

await Deno.copy(file, Deno.stdout);
file.close();