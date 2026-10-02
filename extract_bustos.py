import urllib.request, json, socket, time
socket.setdefaulttimeout(6)

KEY = 'AIzaSyAWGrfCCr7albM3lmCc937gx4uIphbpeKQ'

def list_ch(fid):
    try:
        url = f'https://www.googleapis.com/drive/v3/files?q=%27{fid}%27+in+parents&key={KEY}&fields=files(id,name,mimeType,size,shortcutDetails)&pageSize=100'
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            files = json.loads(resp.read().decode()).get('files', [])
            for f in files:
                if f.get('mimeType') == 'application/vnd.google-apps.shortcut' and f.get('shortcutDetails'):
                    f['targetId'] = f['shortcutDetails'].get('targetId')
            return files
    except Exception as e:
        return []

def format_sz(b):
    if not b: return None
    try:
        n = int(b)
        if n >= 1024*1024: return f'{n/(1024*1024):.1f} MB'
        return f'{n/1024:.0f} KB'
    except: return None

def is_img(n, m):
    if m and m.startswith('image/'): return True
    l = n.lower()
    return any(l.endswith(e) for e in ['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.bmp'])

def is_stl(n, m):
    l = n.lower()
    return any(l.endswith(e) for e in ['.stl', '.3mf', '.obj', '.zip', '.rar', '.7z'])

# 1. Get letter folders from BUSTOS root
letters = list_ch('1x8qHYYHtm7fzJcTYdaveoQoSPQ1DqNFI')
print('Bustos letters:', len(letters))

models = []
for let in letters:
    lid = let.get('targetId') or let['id']
    lname = let['name']
    if lname.startswith('#'): continue # skip updates folder for now
    chars = list_ch(lid)
    for c in chars:
        cname = c['name']
        cid = c.get('targetId') or c['id']
        # filter catholic
        if any(w in cname.lower() for w in ['jesus', 'santo', 'cristo']): continue
        
        ch = list_ch(cid)
        imgs = [x for x in ch if is_img(x['name'], x.get('mimeType', ''))]
        stls = [x for x in ch if is_stl(x['name'], x.get('mimeType', ''))]
        subs = [x for x in ch if x.get('mimeType') == 'application/vnd.google-apps.folder']
        if (not stls or not imgs) and subs:
            for sf in subs[:3]:
                sc = list_ch(sf.get('targetId') or sf['id'])
                if not imgs: imgs.extend([x for x in sc if is_img(x['name'], x.get('mimeType', ''))])
                if not stls: stls.extend([x for x in sc if is_stl(x['name'], x.get('mimeType', ''))])

        img = imgs[0] if imgs else None
        arch = stls[0] if stls else None
        
        item = {
            'folder_id': cid,
            'title': f"Busto {cname}" if "busto" not in cname.lower() else cname,
            'category': 'BUSTOS',
            'section_id': 'sec-bustos',
            'folder_url': f'https://drive.google.com/drive/folders/{cid}'
        }
        if img:
            iid = img.get('targetId') or img['id']
            item['image_id'] = iid
            item['image_url'] = f'https://lh3.googleusercontent.com/u/0/d/{iid}'
            item['thumbnail_url'] = f'https://drive.google.com/thumbnail?id={iid}&sz=w800'
        if arch:
            aid = arch.get('targetId') or arch['id']
            item['stl_id'] = aid
            item['stl_name'] = arch['name']
            item['file_size'] = format_sz(arch.get('size'))
            item['download_url'] = f'https://drive.google.com/uc?id={aid}&export=download'
            item['drive_url'] = f'https://drive.google.com/file/d/{aid}/view?usp=sharing'
        else:
            item['drive_url'] = f'https://drive.google.com/drive/folders/{cid}'
        models.append(item)

print(f'Total Bustos collected: {len(models)}')
with open('cat_bustos.json', 'w', encoding='utf-8') as f:
    json.dump(models, f, ensure_ascii=False, indent=2)
print('Saved cat_bustos.json successfully!')
