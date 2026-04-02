export type OsiLayer = {
    level: number;
    name: string;
    description: string;
    protocols: string;
    device: string;
    color: string;
  };
  
  export const OSI_LAYERS: OsiLayer[] = [
    { level: 7, name: 'Application', description: 'Interaksi langsung dengan End-User (Aplikasi).', protocols: 'HTTP, FTP, SMTP, DNS', device: 'PC, Server, Phone', color: '#DB2777' },
    { level: 6, name: 'Presentation', description: 'Translasi data, Enkripsi, Dekripsi, Kompresi.', protocols: 'SSL, TLS, JPEG, ASCII', device: 'Gateway', color: '#9333EA' },
    { level: 5, name: 'Session', description: 'Membangun, menjaga, dan memutus koneksi antar sesi.', protocols: 'NetBIOS, PPTP, RPC', device: 'Gateway', color: '#4F46E5' },
    { level: 4, name: 'Transport', description: 'Pengiriman data end-to-end, error recovery.', protocols: 'TCP, UDP', device: 'Firewall', color: '#2563EB' },
    { level: 3, name: 'Network', description: 'Pengalamatan Logis (IP Address) & Routing.', protocols: 'IPv4, IPv6, ICMP, IPSec', device: 'Router', color: '#059669' },
    { level: 2, name: 'Data Link', description: 'Pengalamatan Fisik (MAC Address), deteksi error dasar.', protocols: 'Ethernet, PPP, Switch, VLAN', device: 'Switch, Bridge', color: '#D97706' },
    { level: 1, name: 'Physical', description: 'Transmisi bit biner lewat kabel fisik / nirkabel.', protocols: '10Base-T, 802.11 (Wi-Fi), Bluetooth', device: 'Hub, Repeater, Kabel', color: '#DC2626' },
  ];
  
  export type Port = {
    port: number;
    protocol: string;
    name: string;
    description: string;
  };
  
  export const COMMON_PORTS: Port[] = [
    { port: 20, protocol: 'TCP', name: 'FTP (Data)', description: 'Transfer file (Data)' },
    { port: 21, protocol: 'TCP', name: 'FTP (Control)', description: 'Transfer file (Control)' },
    { port: 22, protocol: 'TCP', name: 'SSH', description: 'Remote login aman (Secure Shell)' },
    { port: 23, protocol: 'TCP', name: 'Telnet', description: 'Remote login tidak aman' },
    { port: 25, protocol: 'TCP', name: 'SMTP', description: 'Pengiriman Email' },
    { port: 53, protocol: 'TCP/UDP', name: 'DNS', description: 'Resolusi Nama Domain -> IP' },
    { port: 67, protocol: 'UDP', name: 'DHCP (Server)', description: 'Alokasi IP Otomatis' },
    { port: 68, protocol: 'UDP', name: 'DHCP (Client)', description: 'Klien DHCP' },
    { port: 80, protocol: 'TCP', name: 'HTTP', description: 'Web traffic biasa (tidak aman)' },
    { port: 110, protocol: 'TCP', name: 'POP3', description: 'Penerimaan Email (Client)' },
    { port: 123, protocol: 'UDP', name: 'NTP', description: 'Sinkronisasi Waktu Server' },
    { port: 143, protocol: 'TCP', name: 'IMAP', description: 'Penerimaan Email (Sinkronisasi)' },
    { port: 443, protocol: 'TCP', name: 'HTTPS', description: 'Web traffic aman (SSL/TLS)' },
    { port: 3389, protocol: 'TCP', name: 'RDP', description: 'Remote Desktop Protocol (Windows)' },
    { port: 8080, protocol: 'TCP', name: 'HTTP Proxy', description: 'Alternatif HTTP atau Proxy' },
  ];
  
