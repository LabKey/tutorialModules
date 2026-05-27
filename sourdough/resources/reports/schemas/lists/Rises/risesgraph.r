##
#  Copyright (c) 2023-2026 LabKey Corporation
# 
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
# 
#      http://www.apache.org/licenses/LICENSE-2.0
# 
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
##
png(filename="${imgout:a}", width=900);
plot(labkey.data$x, labkey.data$starter1, type = "b", frame = FALSE, col = "red", xlab = "time elapsed (hrs)", ylab = "volume increase (%)");
lines(labkey.data$x, labkey.data$starter2, col = "blue", type = "b");
lines(labkey.data$x, labkey.data$starter3, col = "green", type = "b");
legend(1, 400, legend=c("starter1", "starter2", "starter3"), fill = c("red", "blue", "green"));
dev.off();
