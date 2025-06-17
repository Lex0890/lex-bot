import { defineConfig } from 'commandkit/config';
import { devtools } from '@commandkit/devtools';

export default defineConfig({
    plugins: [devtools()],
});
