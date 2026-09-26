Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "🚀 SentiAI Automated GitHub Deployment Assistant" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan

# Step 1: Open GitHub New Repository creation in default browser
Write-Host "`n[Step 1] Opening GitHub repository creation page..." -ForegroundColor Yellow
Start-Process "https://github.com/new?name=senti-ai&description=SentiAI+-+Intelligent+Retail+Customer+Experience+and+Recovery+Platform&public=true"

Write-Host "`n👉 In your browser window that just opened:" -ForegroundColor White
Write-Host "   1. Simply click the green 'Create repository' button at the bottom." -ForegroundColor White
Write-Host "   2. Come back to this window and press ENTER." -ForegroundColor White

Read-Host "`nPress ENTER once you have clicked 'Create repository' on GitHub"

# Step 2: Push code to the new repository
Write-Host "`n[Step 2] Pushing SentiAI codebase to GitHub..." -ForegroundColor Yellow
git remote set-url origin https://github.com/YashaswiUrsM/senti-ai.git
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n🎉 SUCCESS! Your SentiAI codebase is live at: https://github.com/YashaswiUrsM/senti-ai" -ForegroundColor Green
    Write-Host "`n[Step 3] Now deploying to Vercel/Render for free public URL..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/new/clone?repository-url=https://github.com/YashaswiUrsM/senti-ai&root-directory=frontend"
} else {
    Write-Host "`n⚠️ If authentication prompt appears in your browser, please approve it." -ForegroundColor Amber
}
