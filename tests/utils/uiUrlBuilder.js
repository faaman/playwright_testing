export function buildUrl(page, params = {}, pages) {
    const uiPath = pages[page];
    if (!uiPath) throw new Error(`Page ${page} not found in pages`);
    
    const qParams = new URLSearchParams(params);
    const queryString = params && Object.keys(params).length 
        ? `?${qParams.toString()}`
        : '';
    
    return `${uiPath}${queryString}`;
}