// 声明
let count = 0;
const uniqueId = () => ++count;

function vm(field = 'pronounce', label = '陈述意见') {
    const template = `<quill-editor v-model="extendData.pronounce"></quill-editor>`;
    const options = {
        data() {
            return {
                extendData: {
                    [field]: "",
                },
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__tmp" + uniqueId(),
    }
}

export {vm}
