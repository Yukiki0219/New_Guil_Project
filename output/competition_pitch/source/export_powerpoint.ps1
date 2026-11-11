$ErrorActionPreference = 'Stop'
$folder = 'C:\Users\user\Guil_Project\output\competition_pitch'
$app = New-Object -ComObject PowerPoint.Application
$deck = $null
try {
    $deck = $app.Presentations.Open("$folder\Guil_Project_Competition_Pitch_Deck.pptx", -1, 0, 0)
    Write-Output "PowerPoint opened slides: $($deck.Slides.Count)"
    $deck.SaveAs("$folder\Guil_Project_Competition_Pitch_Deck.pdf", 32)
    $deck.Export("$folder\preview", 'PNG', 1600, 900)
    $issues = @()
    foreach ($slide in $deck.Slides) {
        foreach ($shape in $slide.Shapes) {
            if ($shape.HasTextFrame -eq -1 -and $shape.TextFrame.HasText -eq -1) {
                $frame = $shape.TextFrame2
                if ($frame.TextRange.BoundHeight -gt ($shape.Height - $frame.MarginTop - $frame.MarginBottom + 3)) {
                    $issues += "Slide $($slide.SlideIndex): text height exceeds shape: $($shape.TextFrame.TextRange.Text)"
                }
                if ($frame.TextRange.BoundWidth -gt ($shape.Width - $frame.MarginLeft - $frame.MarginRight + 3)) {
                    $issues += "Slide $($slide.SlideIndex): text width exceeds shape: $($shape.TextFrame.TextRange.Text)"
                }
            }
        }
    }
    @('Native PowerPoint opened the PPTX.', "Slides: $($deck.Slides.Count)", 'PDF and 1600x900 slide PNGs exported.', "Text overflow warnings: $($issues.Count)") + $issues | Set-Content "$folder\source\native_validation.txt" -Encoding utf8
    Write-Output ($issues -join "`n")
} finally {
    if ($null -ne $deck) { $deck.Close() }
    $app.Quit()
}
