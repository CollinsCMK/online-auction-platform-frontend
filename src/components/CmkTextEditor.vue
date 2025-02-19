<template>
    <div id="toolbar-container">
        <span class="ql-formats">
            <select class="ql-font" title="Font"></select>
            <select class="ql-size" title="Size"></select>
        </span>
        <span class="ql-formats">
            <button class="ql-bold" title="Bold"></button>
            <button class="ql-italic" title="Italic"></button>
            <button class="ql-underline" title="Underline"></button>
            <button class="ql-strike" title="Strikethrough"></button>
        </span>
        <span class="ql-formats">
            <select class="ql-color" title="Text Color"></select>
            <select class="ql-background" title="Background Color"></select>
        </span>
        <span class="ql-formats">
            <button class="ql-script" value="sub" title="Subscript"></button>
            <button class="ql-script" value="super" title="Superscript"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-header" value="1" title="Heading 1"></button>
            <button class="ql-header" value="2" title="Heading 2"></button>
            <button class="ql-blockquote" title="Blockquote"></button>
            <button class="ql-code-block" title="Code Block"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-list" value="ordered" title="Ordered List"></button>
            <button class="ql-list" value="bullet" title="Bullet List"></button>
            <button class="ql-indent" value="-1" title="Decrease Indent"></button>
            <button class="ql-indent" value="+1" title="Increase Indent"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-direction" value="rtl" title="Text Direction"></button>
            <select class="ql-align" title="Text Alignment"></select>
        </span>
        <span class="ql-formats">
            <button class="ql-link" title="Insert Link"></button>
            <button class="ql-image" title="Insert Image"></button>
            <button class="ql-video" title="Insert Video"></button>
            <button class="ql-formula" title="Insert Formula"></button>
        </span>
        <span class="ql-formats">
            <button class="ql-clean" title="Clear Formatting"></button>
        </span>
    </div>

    <div ref="editor" class="custom-editor"></div>
</template>

<script setup lang="ts">
    import Quill from 'quill';
    import "quill/dist/quill.snow.css";
    import { onMounted, ref, defineProps, defineEmits, watch } from 'vue';

    const props = defineProps<{
        modelValue: string
    }>();

    const emit = defineEmits(['update:modelValue']);

    interface QuillInstance {
        getSelection(): { index: number; length: number } | null;
        format(name: string, value: any): void;
        insertText(index: number, text: string, format?: any): void;
        root: { innerHTML: string };
        on: (event: string, handler: () => void) => void;
        setText: (text: string) => void;
    }

    interface HandlerContext {
        quill: QuillInstance;
    }

    const options = {
        modules: {
            toolbar: {
                container: '#toolbar-container',
                handlers: {
                    link: function(this: HandlerContext, value: boolean) {
                        if (value) {
                          const href = prompt('Enter the URL');
                          if (href) {
                            const range = this.quill.getSelection();
                            if (range && range.length > 0) {
                              this.quill.format('link', href);
                            } else if (range) {
                              this.quill.insertText(range.index, href, { link: href });
                            }
                          }
                        } else {
                          this.quill.format('link', false);
                        }
                    }
                }
            }
        },
        placeholder: 'Type here...',
        theme: 'snow'
    };
    const editor = ref<HTMLElement>();
    const quillInstance = ref<QuillInstance | null>(null);

    onMounted(() => {
        if (editor.value) {
            quillInstance.value = new Quill(editor.value, options);

            if (props.modelValue) {
                quillInstance.value.root.innerHTML = props.modelValue;
            }

            quillInstance.value.on('text-change', () => {
                emit('update:modelValue', quillInstance.value?.root.innerHTML || '');
            });
        }
    });

    watch(() => props.modelValue, (newValue) => {
        if (quillInstance.value && newValue !== quillInstance.value.root.innerHTML) {
            quillInstance.value.root.innerHTML = newValue;
        }
    });
</script>

<style scoped>
    .custom-editor {
        height: 200px;
        max-height: 80vh;
        overflow-y: auto;
    }
</style>
