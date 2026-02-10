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
            'src/core/events/**/*.spec.ts',
            'src/domain/notifications/application/use-cases/**/*.spec.ts',
            'src/domain/notifications/application/subscribers/**/*.spec.ts',
            'src/domain/forum/application/use-cases/**/*.spec.ts',
            'src/domain/forum/enterprise/entities/value-objects/**/*.spec.ts',
          ],
        },
      },
    ],
  },
})
