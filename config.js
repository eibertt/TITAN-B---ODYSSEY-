/**
 * TITAN B - ODYSSEY | NÚCLEO DE CONFIGURACIÓN
 * Define la economía, precios en USDT y tasas de minado.
 */

const TITAN_CONFIG = {
    GAME_INFO: {
        NAME: "TITAN B - ODYSSEY",
        VERSION: "2.0.0",
        SYMBOL: "T-COIN",
        REF_BONUS: 5000 // Recompensa por invitar amigos
    },
    
    // CONFIGURACIÓN DE NAVES (ECONOMÍA 2026)
    SHIPS: [
        {
            id: "scout-c1",
            name: "Scout C-1",
            price_usdt: 1,
            mining_rate_hourly: 100,
            color: "#00e5ff", // Cian
            description: "Unidad ligera de exploración."
        },
        {
            id: "heavy-miner",
            name: "Heavy Miner",
            price_usdt: 5,
            mining_rate_hourly: 600,
            color: "#ffcc00", // Oro
            description: "Extracción industrial de T-Coins."
        },
        {
            id: "titan-a15",
            name: "TITAN A-15",
            price_usdt: 15,
            mining_rate_hourly: 2500,
            color: "#ff00de", // Fucsia
            description: "El coloso de la flota. Máximo rendimiento."
        }
    ],

    NETWORK: {
        ADMIN_WALLET: "UQCa4JhWm99Dv9SfeW2fYskEd8VXY-SdJdrWY0auqx5Fm4j9",
        MIN_WITHDRAW_USDT: 5
    }
};

// Exportamos para que otros archivos lo lean
if (typeof module !== 'undefined') module.exports = TITAN_CONFIG;
