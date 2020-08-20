import path from 'path';
import { rollup } from 'rollup';

import lwc from '../../index';

describe('stylesheetConfig', () => {
    it('should accept custom property resolver config', async () => {
        const RESOLVER_MODULE = 'myCssResolver';

        const bundle = await rollup({
            input: path.resolve(__dirname, 'fixtures/test/test.js'),
            plugins: [
                lwc({
                    stylesheetConfig: {
                        customProperties: {
                            resolution: {
                                type: 'module',
                                name: RESOLVER_MODULE,
                            },
                        },
                    },
                }),
            ],
            external: [RESOLVER_MODULE],
        });

        const { output } = await bundle.generate({
            format: 'esm',
        });

        expect(output[0].imports).toEqual([RESOLVER_MODULE]);
    });
});