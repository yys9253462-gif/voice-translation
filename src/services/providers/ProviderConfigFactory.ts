import { ProviderConfig } from './ProviderConfig';
import { ProviderDescriptor } from './ProviderDescriptor';
import { OpenAIProviderConfig } from './OpenAIProviderConfig';
import { Provider, ProviderType } from '../../types/Provider';

export class ProviderConfigFactory {
  private static configs: Map<ProviderType, ProviderDescriptor> = new Map();

  static {
    // MVP: expose only the user's own OpenAI API key flow.
    ProviderConfigFactory.configs.set(Provider.OPENAI, new OpenAIProviderConfig());
  }

  /**
   * Get provider configuration by provider ID
   * @param providerId - The provider identifier
   * @returns ProviderConfig object
   */
  static getConfig(providerId: ProviderType): ProviderConfig {
    const configInstance = this.configs.get(providerId);
    if (!configInstance) {
      throw new Error(`Unsupported provider: ${providerId}`);
    }
    return configInstance.getConfig();
  }

  /**
   * Get all available provider configurations
   * @returns Array of all provider configurations
   */
  static getAllConfigs(): ProviderConfig[] {
    return Array.from(this.configs.values()).map(config => config.getConfig());
  }

  /**
   * Get all available provider IDs
   * @returns Array of provider IDs
   */
  static getAvailableProviders(): ProviderType[] {
    return Array.from(this.configs.keys());
  }

  /**
   * Check if a provider is supported
   * @param providerId - The provider identifier
   * @returns boolean
   */
  static isProviderSupported(providerId: ProviderType): boolean {
    return this.configs.has(providerId);
  }

  /**
   * Register a new provider configuration
   * @param providerId - The provider identifier
   * @param config - The provider descriptor instance
   */
  static registerProvider(providerId: ProviderType, config: ProviderDescriptor): void {
    this.configs.set(providerId, config);
  }

  /**
   * Get the full provider descriptor — the deep module for one provider's
   * behavior. Callers should prefer this over getConfig() when they need
   * more than static config data.
   * @param providerId - The provider identifier
   * @returns ProviderDescriptor instance
   */
  /**
   * The Kizuna-managed provider to put a Basic-mode user on when they sign
   * in, or null when this build offers none.
   *
   * Derived from what is REGISTERED rather than from a feature flag. The
   * managed providers are gated independently, so `isKizunaAIEnabled()` no
   * longer implies any particular one exists — a caller that hardcoded the
   * Translate twin would set a provider `getDescriptor` then throws on.
   *
   * Soniox first: it is the only managed provider open in production, and
   * the wallet page states its rates. The twins stay as fallbacks for
   * builds that register them alone.
   */
  static getDefaultManagedProvider(): ProviderType | null {
    const preferred = [
      Provider.KIZUNA_AI_SONIOX,
      Provider.KIZUNA_AI_OPENAI_TRANSLATE,
      Provider.KIZUNA_AI_VOLCENGINE_AST2,
    ];
    return preferred.find((p) => this.configs.has(p)) ?? null;
  }

  static getDescriptor(providerId: ProviderType): ProviderDescriptor {
    const d = this.configs.get(providerId);
    if (!d) throw new Error(`Unsupported provider: ${providerId}`);
    return d;
  }
}
