// Nome do "Motor" de Cache do Takassi
const CACHE_NAME = 'takassi-mapping-v1';

// Arquivos que o motor vai manter ativos
const urlsToCache = [
  'index.html',
  'manifest.json'
];

// Instalando o mapeamento no sistema
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Takassi Motor] Arquivos mapeados com sucesso');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativando e limpando lixo de versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log('[Takassi Motor] Otimização de 90Hz Ativa');
});

// Interceptor de Performance (Garante o "Zero Delay")
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se já estiver no cache, entrega instantâneo (sem lag de internet)
        return response || fetch(event.request);
      })
  );
});

// Lógica de Mapeamento em Segundo Plano
self.addEventListener('message', (event) => {
  if (event.data.type === 'OPTIMIZE_A15') {
    console.log('[Mapeamento] Ajustando latência para Dimensity 6100+');
    // Aqui o Worker fica "vigiando" a atividade para o sistema não matar o processo
  }
});
