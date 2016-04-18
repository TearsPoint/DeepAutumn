
//选择器
function $get(id, tag) {
    var re = (id && typeof id != "string") ? id : document.getElementById(id);
    if (!tag) { return re; }
    else { return re.getElementsByTagName(tag); }
}

//限制文本框，只能输入数字跟“-”（电话号码）

function myKeyDown(IsEnterToTab) {
    var k = window.event.keyCode;

    if ((k == 46) || (k == 8) || (k == 9) || (k == 189) || (k == 109) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105) || (k >= 37 && k <= 40))
    { }
    else if (k == 13) {
        if (IsEnterToTab) {
            window.event.keyCode = 9;
        }
    }
    else {
        window.event.returnValue = false;
    }
}

//限制文本框，只能输入数字跟“.”（金额）

function myKeyDownMoney(IsEnterToTab) {
    var k = window.event.keyCode;

    if ((k == 46) || (k == 8) || (k == 9) || (k == 190) || (k == 110) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105) || (k >= 37 && k <= 40))
    { }
    else if (k == 13) {
        if (IsEnterToTab) {
            window.event.keyCode = 9;
        }
    }
    else {
        window.event.returnValue = false;
    }
}

//限制文本框，只能输入数字
function myKeyDownIsNum(IsEnterToTab) {
    var k = window.event.keyCode;

    if ((k == 46) || (k == 8) || (k == 9) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105) || (k >= 37 && k <= 40))
    { }
    else if (k == 13) {
        if (IsEnterToTab) {
            window.event.keyCode = 9;
        }
    }
    else {
        window.event.returnValue = false;
    }
}

//获取网站根目录

function getRootPath(controller) {
    var strFullPath = window.location.href.toLowerCase();
    var pos = strFullPath.indexOf("/" + controller.toLowerCase());
    var rootPath = "";
    if (pos >= 0) {
        //包含controller，把controller后面的截断，即为根目录 
        rootPath = strFullPath.substring(0, pos);
    }
    else {
        //不包含controller，而且又带.aspx，即为根目录下页面

        var posASPX = strFullPath.indexOf(".aspx");
        if (posASPX >= 0) {
            posASPX = strFullPath.lastIndexOf("/");
            rootPath = strFullPath.substring(0, posASPX);
        }
        else {
            if (strFullPath.lastIndexOf("/") == strFullPath.length - 1) {
                strFullPath = strFullPath.substring(0, strFullPath.length - 1);
            }
            rootPath = strFullPath;
        }
    }
    return (rootPath);
}


String.prototype.Trim = function () {  //去掉左右空格
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.LTrim = function () { //去掉左空格
    return this.replace(/(^\s*)/g, "");
}

String.prototype.RTrim = function () { //去掉右空格
    return this.replace(/(\s*$)/g, "");
}

function selectOptionByText(id, selectText) {
    var options = $("#" + id + " option");

    if (selectText.Trim() === "") {
        options.first().selected = true;
        return;
    }

    options.each(function (i, e) {
        if ($(e).text() === selectText)
            $(e).attr("selected", true);
    });
}

//选中下拉选项
function selectOption(id, value) {
    try {
        $("#" + id + " option[value=" + value + "]").attr("selected", true);
    } catch (e) {
        var options = $("#" + id + " option");
        options.first().attr("selected", true);
    }
}

function setElementValue(elementId, value) {
    $("#" + elementId).val(value)
}

//编辑
function doEdit(a) {
    $("#content_3").fadeOut(1);

    var t = jQuery.getJSON(getRootPath("HRM") + "/HRM/GetEmpByKey", 'id=' + escape(a),
        function (data, textStatu, jqXHR) {
            setElementValue("empID", data["ID"]);
            setElementValue("StuffName", data["StuffName"]);
            selectOptionByText("Folk", data["Folk"]);
            setElementValue("Birthday", data["BirthdayEx"]);
            setElementValue("Age", data["Age"]);
            selectOptionByText("Sex", data["Sex"]);
            selectOptionByText("Marriage", data["Marriage"]);
            setElementValue("WorkDate", data["WorkDateEx"]);
            selectOptionByText("Kultur", data["Kultur"]);
            selectOptionByText("Visage", data["Visage"]);
            setElementValue("IDCard", data["IDCard"]);
            setElementValue("WorkLength", data["WorkLength"]);
            setElementValue("Province", data["BeAware"]);
            setElementValue("City", data["City"]);
            selectOptionByText("Laborage", data["Laborage"]);
            selectOptionByText("Business", data["Business"]);
            setElementValue("M_Pay", data["M_Pay"]);
            setElementValue("Bank", data["Bank"]);
            selectOptionByText("Branch", data["Branch"]);
            selectOptionByText("Duthcall", data["Duthcall"]);
            setElementValue("Handset", data["Handset"]);
            setElementValue("GraduateDate", data["GraduateDateEx"]);
            setElementValue("School", data["School"]);
            selectOptionByText("EmployeeGenre", data["Employee"]);
        });

    $("#content_3_edit").fadeIn("slow");
}

//查询员工信息
function doQueryEmp() {
    var empName = $("#txtEmployeeName").val();
    if (empName.trim() == "") {
        $("#txtEmployeeName").focus();
    }
    jQuery.getJSON(getRootPath("HRM") + "/HRM" + "/GetEmpBy", 'empName=' + escape(empName),
        function (data, textStatu, jqXHR) {
            $("#div_employees > div").each(function (i, e) {
                if (i != 0) {
                    $(e).remove();
                }
            });

            $.each(data, function (j, d) {
                var row = document.createElement("div");
                row.id = "div_" + d["ID"];
                var rowContentHtml = " <ul>";
                var rowContentHtml = rowContentHtml + "  <li class='_1'>" + d["ID"] + "</li>";
                var rowContentHtml = rowContentHtml + "  <li class='_2'>" + d["StuffName"] + "</li>";
                var rowContentHtml = rowContentHtml + "  <li class='_3'>" + d["Folk"] + "</li>";
                var rowContentHtml = rowContentHtml + "  <li class='_4'>" + d["BirthdayEx"] + "</li>";
                var rowContentHtml = rowContentHtml + "  <li class='_5'>" + d["Age"] + "</li>";
                var rowContentHtml = rowContentHtml + "  <li class='_6'>" + d["Branch"] + "</li>";
                var rowContentHtml = rowContentHtml + "  <li class='_7'>" + d["Business"] + "</li>";

                var rowContentHtml = rowContentHtml + " <li class='_8'> ";
                var rowContentHtml = rowContentHtml + " <a href=\"javascript:doDelete('" + d["ID"] + "')\" class=\"a_do_delete\" title=\"删除\">删除</a> ";
                var rowContentHtml = rowContentHtml + " <a href=\"javascript:doEdit('" + d["ID"] + "')\" class=\"a_do_edit\" title=\"编辑\">编辑</a>";
                var rowContentHtml = rowContentHtml + " </li>";
                var rowContentHtml = rowContentHtml + " </ul>";
                row.innerHTML = rowContentHtml;
                $("#div_employees")[0].appendChild(row);
            }
            );
        });
}

function doSaveEmployee(event) {

    $.ajax(
    {
        url: getRootPath("HRM") + "/HRM" + "/DoSave",
        data: $("#employee_form").serialize(),
        type: 'POST',
        success: function (data) {
            if (data === "-1") { alert("保存失败"); return; }
            if ($("#empID").val() == "-1") {
                $("#empID").val(data);
            }
            alert("已保存");
        } //显示操作提示
    });
}
 
