export interface CliCommand {
  command: string;
  description: string;
}

export interface CliCategory {
  title: string;
  data: CliCommand[];
}

export const MIKROTIK_CHECKLIST = [
  { step: 1, title: 'Reset & Login', desc: 'Login via Mac Address (Winbox). Default IP: 192.168.88.1, User: admin, Pass: (kosong).' },
  { step: 2, title: 'Set Identity', desc: 'System > Identity. Beri nama router agar tidak tertukar saat ujian.' },
  { step: 3, title: 'Set IP Address', desc: 'IP > Addresses. Tambahkan IP untuk ether internet (jika tidak DHCP Client) dan ether lokal.' },
  { step: 4, title: 'Set DNS Server', desc: 'IP > DNS. Isi Servers (misal 8.8.8.8) dan centang "Allow Remote Requests".' },
  { step: 5, title: 'Set Routes (Gateway)', desc: 'IP > Routes. Tambah Dst. Address 0.0.0.0/0 dengan Gateway IP dari ISP.' },
  { step: 6, title: 'Set Firewall NAT', desc: 'IP > Firewall > NAT. Chain: srcnat, Out. Interface: (ether internet), Action: masquerade.' },
];

export const CLI_DATA: CliCategory[] = [
  {
    title: 'MikroTik RouterOS',
    data: [
      { command: 'system identity set name=[nama]', description: 'Mengganti nama router (Identity)' },
      { command: 'ip address add address=[ip/netmask] interface=[eth]', description: 'Menambahkan IP pada interface' },
      { command: 'ip dns set servers=[ip] allow-remote-requests=yes', description: 'Mengatur DNS Server' },
      { command: 'ip route add dst-address=0.0.0.0/0 gateway=[ip]', description: 'Mengatur Default Gateway' },
      { command: 'ip firewall nat add chain=srcnat out-interface=[eth] action=masquerade', description: 'Konfigurasi NAT Masquerade' },
      { command: 'ip dhcp-server setup', description: 'Shortcut membuat DHCP Server' },
      { command: 'system reset-configuration', description: 'Mereset router ke pengaturan pabrik' },
    ]
  },
  {
    title: 'Cisco Router/Switch',
    data: [
      { command: 'enable', description: 'Masuk ke Privileged EXEC mode' },
      { command: 'configure terminal', description: 'Masuk ke Global Configuration mode' },
      { command: 'hostname [name]', description: 'Mengubah nama perangkat' },
      { command: 'show running-config', description: 'Menampilkan konfigurasi yang sedang aktif' },
      { command: 'write memory', description: 'Menyimpan konfigurasi ke NVRAM' },
      { command: 'interface [name]', description: 'Masuk ke konfigurasi interface tertentu' },
      { command: 'ip address [ip] [mask]', description: 'Mengatur alamat IP pada interface' },
      { command: 'no shutdown', description: 'Menghidupkan interface' },
    ]
  },
  {
    title: 'Linux Debian (Server)',
    data: [
      { command: 'su -', description: 'Masuk sebagai mode Super User (Root)' },
      { command: 'apt update', description: 'Memperbarui daftar paket repository' },
      { command: 'apt install [package]', description: 'Menginstal paket aplikasi baru' },
      { command: 'nano [file]', description: 'Membuka teks editor nano' },
      { command: 'systemctl restart [service]', description: 'Merestart layanan (misal: networking)' },
      { command: 'ip a', description: 'Melihat konfigurasi IP address saat ini' },
      { command: 'ping [ip/domain]', description: 'Mengecek konektivitas jaringan' },
      { command: 'chmod [kode] [file]', description: 'Mengubah hak akses (permissions) file' },
    ]
  }
];
