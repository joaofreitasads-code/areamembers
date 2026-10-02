import urllib.request
import json
import time
import socket
from concurrent.futures import ThreadPoolExecutor, as_completed

socket.setdefaulttimeout(8)

KEY = 'AIzaSyAWGrfCCr7albM3lmCc937gx4uIphbpeKQ'
ROOT_FID = '1KTrGsqUpiDFPYPqVq12C2Qe5j-hZ1Wey'

def get_children(folder_id):
    files = []
    page_token = None
    while True:
        url = f'https://www.googleapis.com/drive/v3/files?key={KEY}&q=%27{folder_id}%27+in+parents+and+trashed=false&fields=nextPageToken,files(id,name,mimeType,size,thumbnailLink)&pageSize=1000'
        if page_token:
            url += f'&pageToken={page_token}'
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                files.extend(data.get('files', []))
                page_token = data.get('nextPageToken')
                if not page_token:
                    break
        except Exception as e:
            # retry once
            try:
                time.sleep(0.5)
                req = urllib.request.Request(url)
                with urllib.request.urlopen(req, timeout=8) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    files.extend(data.get('files', []))
                    page_token = data.get('nextPageToken')
                    if not page_token:
                        break
            except Exception:
                break
    return files

root_children = get_children(ROOT_FID)
subfolders = [f for f in root_children if f['mimeType'] == 'application/vnd.google-apps.folder']
print(f'Total subfolders to scan: {len(subfolders)}')

def scan_folder_recursive(folder_id, folder_name, depth=0):
    children = get_children(folder_id)
    sub_subfolders = [c for c in children if c['mimeType'] == 'application/vnd.google-apps.folder']
    direct_files = [c for c in children if c['mimeType'] != 'application/vnd.google-apps.folder']
    
    sub_data = []
    if depth < 2:
        for ssf in sub_subfolders:
            sub_data.append(scan_folder_recursive(ssf['id'], ssf['name'], depth + 1))
            
    return {
        'id': folder_id,
        'name': folder_name,
        'files': direct_files,
        'sub_folders': sub_data
    }

results = []
completed_count = 0

with ThreadPoolExecutor(max_workers=16) as executor:
    future_to_sf = {executor.submit(scan_folder_recursive, sf['id'], sf['name']): sf for sf in subfolders}
    for future in as_completed(future_to_sf):
        completed_count += 1
        try:
            res = future.result()
            results.append(res)
        except Exception as e:
            sf = future_to_sf[future]
            print(f'Error on {sf["name"]}: {e}')
        if completed_count % 25 == 0 or completed_count == len(subfolders):
            print(f'Scanned {completed_count}/{len(subfolders)} folders...')

with open('scanned_veiculos.json', 'w') as f:
    json.dump(results, f, indent=2)

print(f'Successfully saved {len(results)} folders to scanned_veiculos.json')
