
# 森阔变频器智能选型系统

![GitHub stars](https://img.shields.io/github/stars/koltluo/tools?style=social)
![GitHub forks](https://img.shields.io/github/forks/koltluo/tools?style=social)
![GitHub issues](https://img.shields.io/github/issues/koltluo/tools)

## 项目描述
森阔变频器智能选型系统是一款工业级变频器选型工具，通过输入电机参数自动计算推荐型号，并支持选型报告导出和在线订单提交。系统采用响应式设计，适配PC端和移动端，提供专业的技术参数对比图表，帮助工程师快速完成选型决策。

## 核心功能
1. **参数化选型**  
   - 支持电机功率、电压等级、功率因数等9项参数输入
   - 自动计算需求电流并匹配标准型号
   - 提供过载能力和负载类型修正系数

2. **可视化呈现**  
   - 实时电流对比柱状图
   - 选型结果表格展示
   - 响应式设计适配多终端

3. **智能交互**  
   - 动态电压等级关联
   - 智能表单验证
   - 蜜罐字段防机器人提交

4. **文档管理**  
   - 支持PDF报告导出（含选型结果和图表）
   - 自动生成选型型号编码

5. **在线订购**  
   - 一键生成订单
   - 客户信息管理
   - 订单状态反馈

## 技术栈
| 类别       | 技术/工具                          |
|------------|-----------------------------------|
| 前端框架   | HTML5 / CSS3 / JavaScript         |
| 图表引擎   | Chart.js                          |
| PDF生成    | jsPDF + html2canvas               |
| 国际化     | translate.js                      |
| 样式库     | Font Awesome 6.x                  |
| 字体支持   | Noto Sans SC / Microsoft YaHei    |
| 响应式设计 | CSS Grid / Flexbox               |

## 安装部署
```bash
# 克隆项目
git clone https://github.com/koltluo/tools.git

# 安装依赖（可选）
npm install jspdf html2canvas chart.js

# 部署到服务器
serve -s index.html
```

## 使用指南
1. **参数输入**  
   - 填写电机功率、电压等基础参数
   - 选择负载类型和过载要求

2. **执行计算**  
   - 点击「立即计算」按钮
   - 系统自动匹配最优型号并展示对比图表

3. **导出报告**  
   - 点击「导出报告」生成PDF文档
   - 包含选型结果、图表和联系方式

4. **在线下单**  
   - 填写公司信息和订购数量
   - 提交订单后1小时内获得响应

## 注意事项
1. **依赖库版本**  
   - 确保使用兼容版本的 `jspdf@2.5.1` 和 `html2canvas@1.4.1`
   - 检查CDN链接有效性

2. **字体渲染**  
   - 导出PDF时需配置中文字体（如SimSun）
   - 确保浏览器支持CSS字体加载

3. **性能优化**  
   - 大数据量时建议使用Web Worker处理计算
   - 移动端建议压缩图表分辨率

4. **安全加固**  
   - 生产环境需配置HTTPS
   - 定期更新依赖库版本

## 贡献指南
1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/xxx`)
3. 提交代码 (`git commit -m 'feat: add new feature'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建Pull Request

## 联系方式
- 技术支持：+86 150-6499-9739
- 商务合作：sales@lyskjd.com
- 官方网站：[www.lyskjd.com](https://www.lyskjd.com)

## 许可证
MIT License © 2023 临沂森阔机电有限公司

> 系统版本：2.1.0  
> 更新日期：2023-12-31  
> 认证编号：PD-2023-ICSS