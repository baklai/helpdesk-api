export default (apiInspector: string, publicToken: string) => {
  const SERVER_PUBLIC_ROUTE = apiInspector;
  const SERVER_PUBLIC_TOKEN = publicToken;

  const vbs = `
'https://docs.microsoft.com/en-us/windows/win32/wmisdk/wmi-start-page

'On Error Resume Next

POSTJSON "${SERVER_PUBLIC_ROUTE}?field=baseboard", WMI("select * from Win32_BaseBoard")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=bios", WMI("select * from Win32_BIOS")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=os", WMI("select * from Win32_OperatingSystem")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=cpu", WMI("select * from Win32_Processor")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=memorychip", WMI("select * from Win32_PhysicalMemory")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=diskdrive", WMI("select * from Win32_DiskDrive")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=netadapter", WMI("select * from Win32_NetworkAdapter")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=display", WMI("select * from Win32_DesktopMonitor")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=videoadapter", WMI("select * from Win32_VideoController")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=sound", WMI("select * from Win32_SoundDevice")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=useraccount", WMI("select * from Win32_UserAccount")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=useradmin", WMIUsersAdmin()
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=share", WMI("select * from Win32_Share")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=printer", WMI("select * from Win32_Printer")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=product", WMI("select * from Win32_Product")
POSTJSON "${SERVER_PUBLIC_ROUTE}?field=fixupdate", WMI("SELECT * FROM Win32_QuickFixEngineering")

Function WMI(ByVal aQuery)
  Dim objWMIService, objItems, objJSON
  Set objWMIService = GetObject("winmgmts:")
  Set objItems = objWMIService.ExecQuery(aQuery) 
  objJSON = "["
  For Each process In objItems
    Dim propertyJSON
    propertyJSON = ""    
    For Each property In process.Properties_
      If Not IsNull(property.Value) Then
        propertyJSON = propertyJSON & KeyValueJSON(property.Name, property.Value) & ","
      End If
    Next
    If Len(propertyJSON) > 0 Then
      propertyJSON = Left(propertyJSON, Len(propertyJSON) - 1)
    End If   
    objJSON = objJSON & "{" & propertyJSON & "},"
  Next
  If Len(objJSON) > 1 Then
    objJSON = Left(objJSON, Len(objJSON) - 1)
  End If
  objJSON = objJSON & "]"
  WMI = objJSON
End Function

Function WMIUsersAdmin()
  Dim objJSON, objWMIService, groupCollection, groupUserCollection, objGroup, objGroupUser
  Set objWMIService = GetObject("winmgmts:")
  Set groupCollection = objWMIService.ExecQuery("SELECT SID,Name FROM Win32_Group WHERE SID='S-1-5-32-544'")
  Set groupUserCollection = objWMIService.ExecQuery("SELECT * FROM Win32_GroupUser")
  objJSON = "["
  For Each objGroup In groupCollection
    For Each objGroupUser In groupUserCollection
      If InStrRev(objGroupUser.GroupComponent, "Name=" & Chr(34) & objGroup.Name & Chr(34), -1, vbTextCompare) > 0 Then
        objJSON = objJSON & Chr(34) & Replace(Split(objGroupUser.PartComponent, "Name=", -1, vbTextCompare)(1), Chr(34), "") & Chr(34) & ","
      End If
    Next
  Next
  If Len(objJSON) > 1 Then
    objJSON = Left(objJSON, Len(objJSON) - 1)
  End If
  objJSON = objJSON & "]"
  WMIUsersAdmin = objJSON
End Function

Function KeyValueJSON(ByVal key, ByVal value)
  Dim validatedKey, validatedValue
  validatedKey = Chr(34) & key & Chr(34)
  
  Select Case VarType(value)
    Case vbByte, vbInteger, vbLong, vbSingle, vbDouble, vbDate
      validatedValue = value
    Case vbBoolean
      If value Then
        validatedValue = 1
      Else
        validatedValue = 0
      End If
    Case vbString, vbCurrency
      Dim valueEscaped

      valueEscaped = Replace(value, Chr(92), "\\\\")
      valueEscaped = Replace(valueEscaped, Chr(34), "\\""")
      valueEscaped = Replace(valueEscaped, Chr(8), "\\b")
      valueEscaped = Replace(valueEscaped, Chr(12), "\\f")
      valueEscaped = Replace(valueEscaped, Chr(10), "\\n")
      valueEscaped = Replace(valueEscaped, Chr(13), "\\r")
      valueEscaped = Replace(valueEscaped, Chr(9), "\\t")
      valueEscaped = Replace(valueEscaped, Chr(1), "\\u0001")
      valueEscaped = Replace(valueEscaped, Chr(2), "\\u0002")
      valueEscaped = Replace(valueEscaped, Chr(3), "\\u0003")
      valueEscaped = Replace(valueEscaped, Chr(4), "\\u0004")
      valueEscaped = Replace(valueEscaped, Chr(5), "\\u0005")
      valueEscaped = Replace(valueEscaped, Chr(6), "\\u0006")
      valueEscaped = Replace(valueEscaped, Chr(7), "\\u0007")
      valueEscaped = Replace(valueEscaped, Chr(31), "\\u001F")
      validatedValue = Chr(34) & Trim(valueEscaped) & Chr(34)
    Case Else
      validatedValue = Chr(34) & "-" & Chr(34)
  End Select
  
  KeyValueJSON = validatedKey & ":" & validatedValue
End Function

Function WriteToFile(ByVal fileName, ByVal content)
  Dim fso, outputFile
  Set fso = CreateObject("Scripting.FileSystemObject")
  Set outputFile = fso.CreateTextFile(fileName)
  outputFile.WriteLine content
  outputFile.Close
End Function

Function POSTJSON(url, json)
  Dim objHTTP
  Set objHTTP = CreateObject("Microsoft.XMLHTTP")
  
  objHTTP.Open "POST", url, False
  objHTTP.setRequestHeader "Authorization", "${SERVER_PUBLIC_TOKEN}"
  objHTTP.setRequestHeader "User-Agent", "Mozilla/4.0"
  objHTTP.setRequestHeader "Content-Type", "application/json; charset=UTF-8"
  objHTTP.setRequestHeader "Accept", "application/json"
  objHTTP.send json
  
  If objHTTP.Status >= 400 And objHTTP.Status <= 599 Then
    PostJSON = False
  Else
    PostJSON = True
  End If
End Function

'Copyright © ${new Date().getFullYear()} Dmitrii Baklai. All rights reserved.`;

  return vbs;
};
