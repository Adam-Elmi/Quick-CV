export default function TempSection() {
  return (
    <div className="min-h-screen p-2">
      <h1>Templates</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-[800px] min-w-[350px] h-[800px] border-2 border-slate-200 shadow-xl max-[880px]:scale-80 max-[880px]:transform">
          Briefly, Lexical analysis breaks the source code into its lexical
          units. Parsing combines those units into sentences, using the grammar
          (see below) to make sure the are allowable. Semantic analysis makes
          sure the sentences make sense, especially in areas that are not so
          easily specified via the grammar. Type checking is a good example.
          Code generation takes the output of the Parser (many times in the
          format of an Abstract Syntax Tree) and converts it to (virtual)
          machine code, assembly code, or perhaps even code in another
          programming language - C is a popular target.
        </div>
      </div>
    </div>
  );
}
