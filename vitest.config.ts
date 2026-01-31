import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: [
            'src/domain/forum/application/use-cases/**/*.spec.ts',
            'src/domain/forum/enterprise/entities/value-objects/**/*.spec.ts',
          ],
        },
      },
    ],
  },
})
