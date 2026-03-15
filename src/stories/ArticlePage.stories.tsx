import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../layouts/Box/Box'
import { Center } from '../layouts/Center/Center'
import { Cluster } from '../layouts/Cluster/Cluster'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Prose } from '../typography/Prose/Prose'
import { AppHeader, AppFooter } from './shared'

const meta = {
  title: 'Examples/Article Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `\
<Stack space="0">
  <AppHeader />
  <Center maxWidth="48rem" style={{ paddingBlock: '3rem' }}>
    <Stack space="2rem">
      <Stack space="0.75rem">
        <Text variant="overline">Engineering</Text>
        <Heading level={1} size={1} style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>
          How we cut build times by 60% with incremental bundling
        </Heading>
        <Cluster space="1rem" align="center">
          <Text variant="caption">Jane Smith · March 15, 2026 · 8 min read</Text>
        </Cluster>
      </Stack>

      <Prose>
        <p>Over the past year, our monorepo had grown from a handful of packages to over 200...</p>
        <h2>The problem with full rebuilds</h2>
        <p>Our CI pipeline rebuilt every package from scratch on every push...</p>
        <blockquote>The fastest build is the one you never run.</blockquote>
        <h2>Content-addressed caching</h2>
        <pre><code>{\`const key = sha256([...sourceFiles.map(f => f.hash)].join(':'))\`}</code></pre>
      </Prose>

      <Box bordered>
        <Cluster space="1rem" align="center">
          <Stack space="0.25rem">
            <Text variant="body-sm" style={{ fontWeight: 600 }}>Jane Smith</Text>
            <Text variant="caption">Staff Engineer at Acme.</Text>
          </Stack>
        </Cluster>
      </Box>
    </Stack>
  </Center>
  <AppFooter />
</Stack>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ArticlePage: Story = {
  name: 'Article Page',
  render: () => (
    <Stack space="0">
      <AppHeader />
      <Center maxWidth="48rem" style={{ paddingBlock: '3rem' }}>
        <Stack space="2rem">
          <Stack space="0.75rem">
            <Text variant="overline">Engineering</Text>
            <Heading level={1} size={1} style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>
              How we cut build times by 60% with incremental bundling
            </Heading>
            <Cluster space="1rem" align="center">
              <Text variant="caption">Jane Smith · March 15, 2026 · 8 min read</Text>
            </Cluster>
          </Stack>

          <Prose>
            <p>
              Over the past year, our monorepo had grown from a handful of packages to over 200. Build times that once took 45 seconds were creeping toward four minutes — and every second of that was felt on every pull request.
            </p>
            <h2>The problem with full rebuilds</h2>
            <p>
              Our CI pipeline rebuilt every package from scratch on every push. Even a one-line change to a leaf package triggered a cascade of full rebuilds up the dependency tree. We needed a way to cache and reuse work across builds.
            </p>
            <blockquote>
              The fastest build is the one you never run.
            </blockquote>
            <h2>What we tried first</h2>
            <p>
              We experimented with several approaches before landing on our current solution:
            </p>
            <ul>
              <li><strong>Turbo remote cache</strong> — effective but required infrastructure we weren't ready to maintain.</li>
              <li><strong>GitHub Actions cache</strong> — helped, but cache invalidation was coarse-grained.</li>
              <li><strong>Content-addressed outputs</strong> — the key insight that unlocked the most gains.</li>
            </ul>
            <h2>Content-addressed caching</h2>
            <p>
              The breakthrough came when we started hashing <em>inputs</em> — source files, dependencies, environment variables — and using those hashes as cache keys. If the hash matched a previous build, we skipped recompilation entirely.
            </p>
            <pre><code>{`const key = sha256([
  ...sourceFiles.map(f => f.hash),
  packageJson.version,
  process.env.NODE_ENV,
].join(':'))`}</code></pre>
            <h2>Results</h2>
            <p>
              After rolling out incremental bundling across all 200+ packages, median CI build time dropped from 3m 52s to 1m 31s — a 61% reduction. Cold builds (no cache hit) stayed flat, but warm builds — which account for ~85% of CI runs — improved dramatically.
            </p>
          </Prose>

          <Box bordered>
            <Cluster space="1rem" align="center">
              <Stack space="0.25rem">
                <Text variant="body-sm" style={{ fontWeight: 600 }}>Jane Smith</Text>
                <Text variant="caption">Staff Engineer at Acme. Writes about infrastructure and developer experience.</Text>
              </Stack>
            </Cluster>
          </Box>
        </Stack>
      </Center>
      <AppFooter />
    </Stack>
  ),
}
