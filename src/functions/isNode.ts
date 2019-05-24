// @ts-ignore
export const isNode = () => Boolean(typeof process !== 'undefined' &&
// @ts-ignore
                                    process &&
// @ts-ignore
                                    process.versions &&
// @ts-ignore
                                    process.versions.node);

export default isNode;
