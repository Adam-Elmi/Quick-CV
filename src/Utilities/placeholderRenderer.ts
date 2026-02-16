export function renderTemplate(template: string, data: any): string {
    return template.replace(/{([\w.]+)}/g, (match, path) => {
        const value = path.split('.').reduce((obj: any, key: string) => obj?.[key], data);

        if (value === undefined || value === null) {
            return "";
        }

        if (typeof value === 'object' && 'value' in value) {
            return String(value.value);
        }

        return String(value);
    });
}
