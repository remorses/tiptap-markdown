import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";

const Table = Node.create({
    name: 'table',
});

export default createMarkdownExtension(Table, {
    serialize(state, node) {
        node.forEach((row, p, i) => {
            row.forEach((col, p, j) => {
                if(j) {
                    state.write(' | ');
                }
                const cellContent = col.firstChild;
                if(cellContent.textContent.trim()) {
                    state.renderInline(cellContent);
                } else {
                    if(!j) {
                        state.write('| ');
                    } else if(j === row.childCount - 1) {
                        state.write(' |')
                    }
                }
            });
            state.ensureNewLine();
            if(!i) {
                const delimiterRow = Array.from({ length:row.childCount }).map(() => '---').join(' | ');
                state.write(delimiterRow);
                state.ensureNewLine();
            }
        });
        state.closeBlock(node);
    },
    parse: {
        // handled by markdown-it
    },
})