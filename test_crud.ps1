$base = 'https://batik-gumregah.vercel.app'
$token = 'admin123'
$headers = @{
    'Content-Type' = 'application/json'
    'x-admin-token' = $token
}

# ============================
# TEST 1: LOGIN
# ============================
Write-Host '=== TEST 1: LOGIN ===' -ForegroundColor Cyan
$loginBody = '{"password":"admin123"}'
try {
    $login = Invoke-RestMethod -Uri "$base/api/admin/login" -Method POST -Body $loginBody -ContentType 'application/json'
    Write-Host "Login: SUCCESS - token=$($login.token)" -ForegroundColor Green
} catch {
    Write-Host "Login: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# ============================
# TEST 2: GET PRODUCTS (before)
# ============================
Write-Host ""
Write-Host '=== TEST 2: GET PRODUCTS (sebelum create) ===' -ForegroundColor Cyan
try {
    $before = Invoke-RestMethod -Uri "$base/api/admin/products" -Method GET -Headers $headers
    Write-Host "GET Products: SUCCESS - jumlah=$($before.Count)" -ForegroundColor Green
    $before | ForEach-Object { Write-Host "  - $($_.id): $($_.nameId) [$($_.category)]" }
} catch {
    Write-Host "GET Products: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# ============================
# TEST 3: CREATE PRODUCT
# ============================
Write-Host ""
Write-Host '=== TEST 3: CREATE PRODUCT ===' -ForegroundColor Cyan
$newProduct = @{
    category = 'Batik Tulis'
    motif = 'Parang'
    nameId = 'Test Batik PowerShell'
    nameEn = 'PowerShell Test Batik'
    descId = 'Produk test dari PowerShell - akan dihapus'
    descEn = 'Test product from PowerShell - will be deleted'
    price = 250000
    sizes = 'S, M, L'
    materialId = 'Kain Primissima'
    materialEn = 'Primissima Fabric'
    estimasiId = '7-14 hari'
    estimasiEn = '7-14 days'
    careId = 'Cuci manual'
    careEn = 'Hand wash'
    featured = $false
    images = @()
} | ConvertTo-Json -Compress

try {
    $created = Invoke-RestMethod -Uri "$base/api/admin/products" -Method POST -Body $newProduct -Headers $headers
    $createdId = $created.id
    Write-Host "CREATE Product: SUCCESS" -ForegroundColor Green
    Write-Host "  ID: $createdId"
    Write-Host "  Nama: $($created.nameId)"
    Write-Host "  Harga: $($created.price)"
} catch {
    Write-Host "CREATE Product: FAILED - $($_.Exception.Message)" -ForegroundColor Red
    $createdId = $null
}

# ============================
# TEST 4: UPDATE PRODUCT
# ============================
Write-Host ""
Write-Host '=== TEST 4: UPDATE PRODUCT ===' -ForegroundColor Cyan
if ($createdId) {
    $updateBody = @{
        id = $createdId
        nameId = 'Test Batik PowerShell (UPDATED)'
        price = 350000
    } | ConvertTo-Json -Compress

    try {
        $updated = Invoke-RestMethod -Uri "$base/api/admin/products" -Method PATCH -Body $updateBody -Headers $headers
        Write-Host "UPDATE Product: SUCCESS" -ForegroundColor Green
        Write-Host "  Result: $($updated | ConvertTo-Json -Compress)"
    } catch {
        Write-Host "UPDATE Product: FAILED - $($_.Exception.Message)" -ForegroundColor Red
    }

    # Verify update
    Start-Sleep -Seconds 1
    $afterUpdate = Invoke-RestMethod -Uri "$base/api/admin/products" -Method GET -Headers $headers
    $updatedProduct = $afterUpdate | Where-Object { $_.id -eq $createdId }
    if ($updatedProduct) {
        Write-Host "  Verify nama baru: $($updatedProduct.nameId)" -ForegroundColor Yellow
        Write-Host "  Verify harga baru: $($updatedProduct.price)" -ForegroundColor Yellow
    }
} else {
    Write-Host "SKIP - tidak ada ID produk yang di-create" -ForegroundColor Yellow
}

# ============================
# TEST 5: DELETE PRODUCT
# ============================
Write-Host ""
Write-Host '=== TEST 5: DELETE PRODUCT ===' -ForegroundColor Cyan
if ($createdId) {
    $deleteBody = @{ id = $createdId } | ConvertTo-Json -Compress
    try {
        $deleted = Invoke-RestMethod -Uri "$base/api/admin/products" -Method DELETE -Body $deleteBody -Headers $headers
        Write-Host "DELETE Product: SUCCESS" -ForegroundColor Green
        Write-Host "  Result: $($deleted | ConvertTo-Json -Compress)"
    } catch {
        Write-Host "DELETE Product: FAILED - $($_.Exception.Message)" -ForegroundColor Red
    }

    # Verify deletion
    Start-Sleep -Seconds 1
    $afterDelete = Invoke-RestMethod -Uri "$base/api/admin/products" -Method GET -Headers $headers
    $stillExists = $afterDelete | Where-Object { $_.id -eq $createdId }
    if ($stillExists) {
        Write-Host "  Verify: GAGAL - produk masih ada!" -ForegroundColor Red
    } else {
        Write-Host "  Verify: BERHASIL - produk sudah terhapus dari DB" -ForegroundColor Green
    }
} else {
    Write-Host "SKIP - tidak ada ID produk yang di-create" -ForegroundColor Yellow
}

# ============================
# TEST 6: CREATE + DELETE TESTIMONIAL
# ============================
Write-Host ""
Write-Host '=== TEST 6: CREATE TESTIMONIAL ===' -ForegroundColor Cyan
$testiHeaders = @{
    'Content-Type' = 'application/json'
    'x-admin-token' = $token
}
$testiBody = @{
    name = 'Test User PowerShell'
    country = 'Indonesia'
    flag = '🇮🇩'
    rating = 5
    text = 'Ini testimonial test, akan segera dihapus'
} | ConvertTo-Json -Compress

try {
    $testiCreated = Invoke-RestMethod -Uri "$base/api/admin/testimonials" -Method POST -Body $testiBody -Headers $testiHeaders
    $testiId = $testiCreated.id
    Write-Host "CREATE Testimonial: SUCCESS - ID=$testiId" -ForegroundColor Green
    
    # Delete it
    Write-Host '=== TEST 7: DELETE TESTIMONIAL ===' -ForegroundColor Cyan
    $testiDelBody = @{ id = $testiId } | ConvertTo-Json -Compress
    $testiDel = Invoke-RestMethod -Uri "$base/api/admin/testimonials" -Method DELETE -Body $testiDelBody -Headers $testiHeaders
    Write-Host "DELETE Testimonial: SUCCESS" -ForegroundColor Green
} catch {
    Write-Host "Testimonial CRUD: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# ============================
# HASIL AKHIR GET PRODUCTS
# ============================
Write-Host ""
Write-Host '=== FINAL: GET PRODUCTS (setelah semua test) ===' -ForegroundColor Cyan
try {
    $final = Invoke-RestMethod -Uri "$base/api/products" -Method GET
    Write-Host "Total produk: $($final.Count)" -ForegroundColor Green
    $final | ForEach-Object { Write-Host "  - $($_.id): $($_.nameId) [$($_.category)] Rp$($_.price)" }
} catch {
    Write-Host "FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== SEMUA TEST SELESAI ===" -ForegroundColor Magenta
