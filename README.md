# TS + Playwright + Cucumber Test Automation Framework

Bu repo; TypeScript, Playwright ve Cucumber kullanarak çok ortamlı (stg, preprod, prod) bir test otomasyon
framework örneğidir.

## Kurulum

```bash
npm install
npx playwright install
```

## Çalıştırma

### STG ortamında test

```bash
npm run test:stg
```

### PRE-PROD ortamında test

```bash
npm run test:preprod
```

### PROD ortamında test

```bash
npm run test:prod
```

`ENV` environment değişkenine göre ilgili config dosyası (`src/config/environments/*.json`) yüklenir.

## Yapı

- `features/` - Cucumber feature dosyaları
- `src/steps/` - Step definition dosyaları
- `src/hooks/` - Cucumber Before/After hook'ları
- `src/support/` - World, custom context vb.
- `src/pages/` - Page Object Model sınıfları
- `src/config/` - Ortam config'leri
- `src/utils/` - Helper fonksiyonlar
- `reports/` - Cucumber JSON report output (CI/CD için kullanılabilir)
